import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { Dungeon, DungeonInstance } from '../models/dungeonModel.js';
import { clearQueue } from '../rabbitmq/consumer.js';

class DungeonRepository {
    static #instance = null;
    static #initializing = false;

    static async getInstance() {
        if (DungeonRepository.#instance) {
            return DungeonRepository.#instance;
        }

        if (DungeonRepository.#initializing) {
            await new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (DungeonRepository.#instance) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 50);
            });
            return DungeonRepository.#instance;
        }

        DungeonRepository.#initializing = true;
        DungeonRepository.#instance = await this.initDatabase();
        DungeonRepository.#initializing = false;

        return DungeonRepository.#instance;
    }

    static async initDatabase() {
        try {
            const connection = await mysql.createConnection({
                host: 'localhost',
                user: 'admin',
                password: 'admin',
                database: 'doodle_db_dungeon_service',
                port: 3308
            });

            await this.dropTables(connection);
            await this.createTables(connection);
            await this.insertDungeonsFromFiles(connection);
            clearQueue();

            return connection;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async dropTables(connection) {
        const dropTables = fs.readFileSync('./backend/dungeon-service/database/dropTableDungeon.sql', 'utf-8');
        for (let query of dropTables.split(';')) {
            if (query.trim() !== '') {
                await connection.query(query);
            }
        }
        console.log("- Dungeon service tables dropped");
    }

    static async createTables(connection) {
        const creationTables = fs.readFileSync('./backend/dungeon-service/database/createTableDungeon.sql', 'utf-8');
        for (let query of creationTables.split(';')) {
            if (query.trim() !== '') {
                await connection.query(query);
            }
        }
        console.log("- Dungeon service tables updated");
    }

    static async getDungeons() {
        const connection = await this.getInstance();
        const [results] = await connection.query(`SELECT * FROM ${Dungeon.tableName}`);
        return results;
    }

    static async getCurrentUserDungeon(userId) {
        const connection = await this.getInstance();
        const [results] = await connection.query(`SELECT * FROM ${DungeonInstance.tableName} WHERE user_id = ? ORDER BY id DESC LIMIT 1`, [userId]);
        return results[0];
    }

    static async getUserDungeons(userId) {
        const connection = await this.getInstance();
        const [results] = await connection.query(`SELECT * FROM ${DungeonInstance.tableName} WHERE user_id = ?`, [userId]);
        return results;
    }

    static async insertDungeonsFromFiles(connection) {
        const dungeonsFile = './backend/dungeon-service/src/dungeons/dungeons.json';
        try {
            if (fs.existsSync(dungeonsFile)) {
                const itemData = JSON.parse(fs.readFileSync(dungeonsFile, 'utf-8'));
                for (const item of itemData) {
                    await connection.query(
                        `INSERT INTO ${Dungeon.tableName} (name, map, monsters) VALUES (?, ?, ?)`,
                        [item.name, JSON.stringify(item.map), JSON.stringify(item.monsters)]
                    );
                    console.log(`- Dungeon ${item.name} inserted`);
                }
            }
        } catch (err) {
            console.error("Error inserting dungeons from files:", err);
        }
    }

    static async getDungeonById(id) {
        const connection = await this.getInstance();
        const [results] = await connection.query(`SELECT * FROM ${Dungeon.tableName} WHERE id = ?`, [id]);
        return results[0];
    }

    static async getDungeonInstanceById(id) {
        const connection = await this.getInstance();
        const [results] = await connection.query(`SELECT * FROM ${DungeonInstance.tableName} WHERE id = ?`, [id]);
        return results[0];
    }

    static async createDungeonInstance(userId, dungeonId) {
        const connection = await this.getInstance();
        const [result] = await connection.query(
            `INSERT INTO ${DungeonInstance.tableName} (dungeon_id, user_id) VALUES (?, ?)`,
            [dungeonId, userId]
        );
        return result.insertId;
    }

    static async deleteDungeonInstance(id) {
        const connection = await HeroRepository.getInstance();
        const [result] = await connection.query(`DELETE FROM ${DungeonInstance.tableName} WHERE id = ?`, [id]);
        return result.affectedRows > 0;
    }
}

export default DungeonRepository;

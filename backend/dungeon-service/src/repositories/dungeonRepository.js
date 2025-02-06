import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { Dungeon, DungeonInstance } from '../models/dungeonModel.js';

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

    static async getUserDungeons(userId) {
        const connection = await this.getInstance();
        const [results] = await connection.query(`SELECT * FROM ${Dungeon.instanceTableName} WHERE user_id = ?`, [userId]);
        return results;
    }

    static async insertDungeonsFromFiles(connection) {
        const dungeonsDir = './backend/dungeon-service/src/dungeons';
        try {
            const files = fs.readdirSync(dungeonsDir);

            for (const file of files) {
                if (path.extname(file) === '.json') {
                    const filePath = path.join(dungeonsDir, file);
                    const filename = file.split('.json')[0];
                    const dungeonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

                    const mapJson = JSON.stringify(dungeonData.map);
                    const monstersJson = JSON.stringify(dungeonData.monsters);

                    await connection.query(
                        `INSERT INTO ${Dungeon.tableName} (name, map, monsters) VALUES (?, ?, ?)`,
                        [filename, mapJson, monstersJson]
                    );

                    console.log(`- Dungeon "${filename}" inserted from ${file}`);
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

    static async createDungeonInstance(id) {
        const connection = await this.getInstance();
        const [result] = await connection.query(
            `INSERT INTO ${DungeonInstance.tableName} (dungeon_id) VALUES (?)`,
            [id]
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

import mysql from 'mysql2/promise';
import fs from 'fs';
import { Monster, MonsterInstance } from '../models/monsterModel.js';

class MonsterRepository {
    static #instance = null;
    static #initializing = false;

    static async getInstance() {
        if (MonsterRepository.#instance) {
            return MonsterRepository.#instance;
        }

        if (MonsterRepository.#initializing) {
            await new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (MonsterRepository.#instance) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 50);
            });
            return MonsterRepository.#instance;
        }

        MonsterRepository.#initializing = true;
        MonsterRepository.#instance = await this.initDatabase();
        MonsterRepository.#initializing = false;

        return MonsterRepository.#instance;
    }

    static async initDatabase() {
        try {
            const connection = await mysql.createConnection({
                host: 'localhost',
                user: 'admin',
                password: 'admin',
                database: 'doodle_db_monster_service',
                port: 3310
            });

            await this.dropTables(connection);
            await this.createTables(connection);
            await this.insertMonstersFromFiles(connection);

            return connection;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async dropTables(connection) {
        const dropTables = fs.readFileSync('./backend/monster-service/database/dropTableMonster.sql', 'utf-8');
        for (let query of dropTables.split(';')) {
            if (query.trim() !== '') {
                await connection.query(query);
            }
        }
        console.log("- Monster service tables dropped");
    }

    static async createTables(connection) {
        const creationTables = fs.readFileSync('./backend/monster-service/database/createTableMonster.sql', 'utf-8');
        for (let query of creationTables.split(';')) {
            if (query.trim() !== '') {
                await connection.query(query);
            }
        }
        console.log("- Monster service tables updated");
    }

    static async insertMonstersFromFiles(connection) {
        const monstersFile = './backend/monster-service/src/monsters/monsters.json';
        try {
            if (fs.existsSync(monstersFile)) {
                const monstersData = JSON.parse(fs.readFileSync(monstersFile, 'utf-8'));
                for (const monster of monstersData) {
                    await connection.query(
                        `INSERT INTO ${Monster.tableName} (name, health, power, experience) VALUES (?, ?, ?, ?)`,
                        [monster.name, monster.health, monster.power, monster.experience]);
                    console.log(`- Monster ${monster.name} inserted`);
                }
                console.log(`- Monsters inserted from ${monstersFile}`);
            }
        } catch (err) {
            console.error("Error inserting items from file:", err);
        }
    }

    static async takeDamage(id, damage) {
        const connection = await MonsterRepository.getInstance();
        const [result] = await connection.query(
            `UPDATE ${MonsterInstance.tableName} SET current_health = GREATEST(current_health - ?, 0) WHERE monster_instance_id = ?`,
            [damage, id]
        );
        if (result.affectedRows > 0) {
            const monsterInstance = await MonsterRepository.getMonsterInstanceById(id);
            return monsterInstance;
        }
        return null;
    }

    static async getMonstersByDungeonInstanceId(dungeonInstanceId) {
        const connection = await MonsterRepository.getInstance();
        const [results] = await connection.query(`SELECT * FROM ${MonsterInstance.tableName} JOIN ${Monster.tableName} ON ${MonsterInstance.tableName}.monster_id = ${Monster.tableName}.id WHERE dungeon_instance_id = ?`, [dungeonInstanceId]);        
        if (results.length > 0) {
            return results.map(({ id, ...rest }) => rest);
        }
    }

    static async getMonsterById(id) {
        const connection = await MonsterRepository.getInstance();
        const [results] = await connection.query(`SELECT * FROM ${Monster.tableName} WHERE id = ?`, [id]);
        if (results.length > 0) {
            const userData = results[0];
            return Monster.fromDatabase(userData);
        }
        return null;
    }

    static async getMonsterInstanceById(monsterId) {
        const connection = await MonsterRepository.getInstance();
        const [results] = await connection.query(`SELECT * FROM ${MonsterInstance.tableName} WHERE monster_instance_id = ?`, [monsterId]);
        if (results.length > 0) {
            const monsterInstanceData = results[0];
            return MonsterInstance.fromDatabase(monsterInstanceData);
        }
        return null;
    }

    static async createMonsterInstance(monsterId, dungeonInstanceId, position) {
        const current_health = (await MonsterRepository.getMonsterById(monsterId)).health;
        const connection = await MonsterRepository.getInstance();
        const [result] = await connection.query(`INSERT INTO ${MonsterInstance.tableName} (monster_id, dungeon_instance_id, current_health, position) VALUES (?, ?, ?, ?)`, [monsterId, dungeonInstanceId, current_health, JSON.stringify(position)]);
        if (result.affectedRows > 0) {
            return await MonsterRepository.getMonsterInstanceById(result.insertId);
        }
        return null;
    }

    static async deleteMonsterInstance(monsterId) {
        const connection = await MonsterRepository.getInstance();
        const [result] = await connection.query(`DELETE FROM ${MonsterInstance.tableName} WHERE monster_instance_id = ?`, [monsterId]);
        if (result.affectedRows > 0) {
            return true;
        }
        return false;
    }

    static async move(id, position) {
        const connection = await MonsterRepository.getInstance();
        const positionJson = JSON.stringify(position);
        const [result] = await connection.query(
            `UPDATE ${MonsterInstance.tableName} SET position = ? WHERE monster_instance_id = ?`,
            [positionJson, id]
        );
        if (result.affectedRows > 0) {
            const hero = await MonsterRepository.getMonsterInstanceById(id);
            return hero;
        }
        return null;
    }
}

export default MonsterRepository;

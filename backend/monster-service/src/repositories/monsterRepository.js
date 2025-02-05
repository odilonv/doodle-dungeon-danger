import mysql from 'mysql2/promise';
import fs from 'fs';

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
}

export default MonsterRepository;

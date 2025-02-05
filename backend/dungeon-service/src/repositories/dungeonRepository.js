import mysql from 'mysql2/promise';
import fs from 'fs';

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
}

export default DungeonRepository;

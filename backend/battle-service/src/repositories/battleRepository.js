import mysql from 'mysql2/promise';
import fs from 'fs';

class BattleRepository {
    static #instance = null;
    static #initializing = false;

    static async getInstance() {
        if (BattleRepository.#instance) {
            return BattleRepository.#instance;
        }

        if (BattleRepository.#initializing) {
            await new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (BattleRepository.#instance) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 50);
            });
            return BattleRepository.#instance;
        }

        BattleRepository.#initializing = true;
        BattleRepository.#instance = await this.initDatabase();
        BattleRepository.#initializing = false;

        return BattleRepository.#instance;
    }

    static async initDatabase() {
        try {
            const connection = await mysql.createConnection({
                host: 'localhost',
                user: 'admin',
                password: 'admin',
                database: 'doodle_db_battle_service',
                port: 3309
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
        const dropTables = fs.readFileSync('./backend/battle-service/database/dropTableBattle.sql', 'utf-8');
        for (let query of dropTables.split(';')) {
            if (query.trim() !== '') {
                await connection.query(query);
            }
        }
        console.log("- Battle service tables dropped");
    }

    static async createTables(connection) {
        const creationTables = fs.readFileSync('./backend/battle-service/database/createTableBattle.sql', 'utf-8');
        for (let query of creationTables.split(';')) {
            if (query.trim() !== '') {
                await connection.query(query);
            }
        }
        console.log("- Battle service tables updated");
    }
}

export default BattleRepository;

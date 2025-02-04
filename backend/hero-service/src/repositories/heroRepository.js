import mysql from 'mysql2/promise';
import fs from 'fs';

class heroRepository {
    static #instance = null;
    static #initializing = false;

    static async getInstance() {
        if (heroRepository.#instance) {
            return heroRepository.#instance;
        }

        if (heroRepository.#initializing) {
            await new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (heroRepository.#instance) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 50);
            });
            return heroRepository.#instance;
        }

        heroRepository.#initializing = true;
        heroRepository.#instance = await this.initDatabase();
        heroRepository.#initializing = false;

        return heroRepository.#instance;
    }

    static async initDatabase() {
        try {
            const connection = await mysql.createConnection({
                host: 'localhost',
                user: 'admin',
                password: 'admin',
                database: 'doodle_db_hero_service',
                port: 3307
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
        const dropTables = fs.readFileSync('./backend/user-service/database/dropTableHero.sql', 'utf-8');
        for (let query of dropTables.split(';')) {
            if (query.trim() !== '') {
                await connection.query(query);
            }
        }
        console.log("- Hero's service tables dropped");
    }

    static async createTables(connection) {
        const creationTables = fs.readFileSync('./backend/user-service/database/createTableHero.sql', 'utf-8');
        for (let query of creationTables.split(';')) {
            if (query.trim() !== '') {
                await connection.query(query);
            }
        }
        console.log("- Hero's service tables Updated");
    }
}

export default heroRepository;
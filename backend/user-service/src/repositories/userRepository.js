import mysql from 'mysql2/promise';
import fs from 'fs';
import bcrypt from 'bcrypt';

class userRepository {
    static #instance = null;
    static #initializing = false;

    static async getInstance() {
        if (userRepository.#instance) {
            return userRepository.#instance;
        }

        if (userRepository.#initializing) {
            await new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (userRepository.#instance) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 50);
            });
            return userRepository.#instance;
        }

        userRepository.#initializing = true;
        userRepository.#instance = await this.initDatabase();
        userRepository.#initializing = false;

        return userRepository.#instance;
    }

    static async initDatabase() {
        try {
            const connection = await mysql.createConnection({
                host: 'localhost',
                user: 'admin',
                password: 'admin',
                database: 'doodle_db_user_service',
                port: 3306
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
        const dropTables = fs.readFileSync('./backend/user-service/database/dropTableUser.sql', 'utf-8');
        for (let query of dropTables.split(';')) {
            if (query.trim() !== '') {
                await connection.query(query);
            }
        }
        console.log("- User's service tables dropped");
    }

    static async createTables(connection) {
        const creationTables = fs.readFileSync('./backend/user-service/database/createTableUser.sql', 'utf-8');
        for (let query of creationTables.split(';')) {
            if (query.trim() !== '') {
                await connection.query(query);
            }
        }
        console.log("- User's service tables Updated");

        connection.query(
            'INSERT INTO user (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
            ['Admin', 'Admin', 'admin@admin.com', bcrypt.hashSync('admin', 10)]
        );

        console.log("- Admin user created");
    }
}

export default userRepository;
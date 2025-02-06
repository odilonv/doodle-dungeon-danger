import mysql from 'mysql2/promise';
import fs from 'fs';
import bcrypt from 'bcrypt';

class UserRepository {
    static #instance = null;
    static #initializing = false;

    static async getInstance() {
        if (this.#instance) {
            return this.#instance;
        }

        if (this.#initializing) {
            await new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (this.#instance) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 50);
            });
            return this.#instance;
        }

        this.#initializing = true;
        this.#instance = await this.#initDatabase();
        this.#initializing = false;

        return this.#instance;
    }

    static async #initDatabase() {
        try {
            const connection = await mysql.createConnection({
                host: 'localhost',
                user: 'admin',
                password: 'admin',
                database: 'doodle_db_user_service',
                port: 3306
            });

            await this.#dropTables(connection);
            await this.#createTables(connection);

            return connection;
        } catch (err) {
            console.error('Database initialization error:', err);
            throw err;
        }
    }

    static async #dropTables(connection) {
        const dropTables = fs.readFileSync('./backend/user-service/database/dropTableUser.sql', 'utf-8');
        for (let query of dropTables.split(';')) {
            if (query.trim() !== '') {
                await connection.query(query);
            }
        }
    }

    static async #createTables(connection) {
        const creationTables = fs.readFileSync('./backend/user-service/database/createTableUser.sql', 'utf-8');
        for (let query of creationTables.split(';')) {
            if (query.trim() !== '') {
                await connection.query(query);
            }
        }

        await connection.query(
            'INSERT INTO user (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
            ['Admin', 'Admin', 'admin@admin.com', bcrypt.hashSync('admin', 10)]
        );

    }

    async createUser(user) {
        const connection = await UserRepository.getInstance();
        const [result] = await connection.query(
            `INSERT INTO user (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`,
            [user.firstName, user.lastName, user.email, user.password]
        );
        return result.insertId;
    }

    async getUserByEmail(email) {
        const connection = await UserRepository.getInstance();
        const [results] = await connection.query(`SELECT * FROM user WHERE email = ?`, [email]);
        return results.length ? results[0] : null;
    }

    async getUserById(id) {
        const connection = await UserRepository.getInstance();
        const [results] = await connection.query(`SELECT * FROM user WHERE id = ?`, [id]);
        return results.length ? results[0] : null;
    }

    async deleteUser(id) {
        const connection = await UserRepository.getInstance();
        const [result] = await connection.query(`DELETE FROM user WHERE id = ?`, [id]);
        return result.affectedRows > 0;
    }
}

export default UserRepository;

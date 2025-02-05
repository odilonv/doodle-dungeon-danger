import mysql from 'mysql2/promise';
import heroModel from '../models/heroModel.js';

class HeroRepository {
    static #instance = null;
    static #initializing = false;

    static async getInstance() {
        if (HeroRepository.#instance) {
            return HeroRepository.#instance;
        }

        if (HeroRepository.#initializing) {
            await new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (HeroRepository.#instance) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 50);
            });
            return HeroRepository.#instance;
        }

        HeroRepository.#initializing = true;
        HeroRepository.#instance = await this.initDatabase();
        HeroRepository.#initializing = false;

        return HeroRepository.#instance;
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

            // await this.dropTables(connection);
            // await this.createTables(connection);

            return connection;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async createHero(newHero) {
        const connection = await HeroRepository.getInstance();
        const [result] = await connection.query(
            `INSERT INTO ${heroModel.tableName} (name) VALUES (?)`,
            [newHero.name]
        );
        if (result.affectedRows > 0) {
            const [rows] = await connection.query(`SELECT LAST_INSERT_ID() as id`);
            newHero.id = rows[0].id;
            return newHero;
        }
        return null;
    }

    static async deleteHero(id) {
        const connection = await HeroRepository.getInstance();
        const [result] = await connection.query(`DELETE FROM ${heroModel.tableName} WHERE id = ?`, [id]);
        return result.affectedRows > 0;
    }

    static async getHeroById(id) {
        const connection = await HeroRepository.getInstance();
        const [results] = await connection.query(`SELECT * FROM ${heroModel.tableName} WHERE id = ?`, [id]);
        if (results.length > 0) {
            const userData = results[0];
            return heroModel.fromDatabase(userData);
        }
        return null;
    }

    static async takeDamage(id, damage) {
        const connection = await HeroRepository.getInstance();
        const [result] = await connection.query(
            `UPDATE ${heroModel.tableName} SET current_health = GREATEST(current_health - ?, 0) WHERE id = ?`, 
            [damage, id]
        );
        if (result.affectedRows > 0) {
            const hero = await HeroRepository.getHeroById(id);
            return hero;
        }
        return null;
    }

    static async heal(id, healthPoints) {
        const connection = await HeroRepository.getInstance();
        const [result] = await connection.query(
            `UPDATE ${heroModel.tableName} SET current_health = LEAST(max_health, current_health + ?) WHERE id = ?`, 
            [healthPoints, id]
        );
        if (result.affectedRows > 0) {
            const hero = await HeroRepository.getHeroById(id);
            return hero;
        }
        return null;
    }

    static async gainExperience(id, experiencePoints) {
        const connection = await HeroRepository.getInstance();
        const [result] = await connection.query(
            `UPDATE ${heroModel.tableName} SET experience = experience + ? WHERE id = ?`, 
            [experiencePoints, id]
        );
        if (result.affectedRows > 0) {
            const hero = await HeroRepository.getHeroById(id);
            return hero;
        }
        return null;
    }

    static async move(id, position) {
        const connection = await HeroRepository.getInstance();
        const positionJson = JSON.stringify(position);
        const [result] = await connection.query(
            `UPDATE ${heroModel.tableName} SET position = ? WHERE id = ?`, 
            [positionJson, id]
        );
        if (result.affectedRows > 0) {
            const hero = await HeroRepository.getHeroById(id);
            return hero;
        }
        return null;
    }

    static async nextDungeon(id) {
        const connection = await HeroRepository.getInstance();
        const [result] = await connection.query(
            `UPDATE ${heroModel.tableName} 
            SET current_dungeon = IFNULL(current_dungeon, 0) + 1 
            WHERE id = ?`,
            [id]
        );
        if (result.affectedRows > 0) {
            const hero = await HeroRepository.getHeroById(id);
            return hero;
        }
        return null;
    }
}

export default HeroRepository;

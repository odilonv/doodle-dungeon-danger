import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { Hero, Item, Inventory } from '../models/heroModel.js';

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

            await this.dropTables(connection);
            await this.createTables(connection);
            await this.insertItemsFromFiles(connection);

            return connection;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    static async dropTables(connection) {
        const dropTables = fs.readFileSync('./backend/hero-service/database/dropTableHero.sql', 'utf-8');
        for (let query of dropTables.split(';')) {
            if (query.trim() !== '') {
                await connection.query(query);
            }
        }
        console.log("- Hero service tables dropped");
    }

    static async createTables(connection) {
        const creationTables = fs.readFileSync('./backend/hero-service/database/createTableHero.sql', 'utf-8');
        for (let query of creationTables.split(';')) {
            if (query.trim() !== '') {
                await connection.query(query);
            }
        }
        console.log("- Hero service tables updated");
    }

    static async insertItemsFromFiles(connection) {
        const itemsFile = './backend/hero-service/src/items/items.json';
        try {
            if (fs.existsSync(itemsFile)) {
                const itemsData = JSON.parse(fs.readFileSync(itemsFile, 'utf-8'));
                
                for (const item of itemsData) {
                    await connection.query(
                        `INSERT INTO ${Item.tableName} (name, min_level, mana_cost, health_cost, power, health_bonus, mana_bonus) 
                        VALUES (?, ?, ?, ?, ?, ?, ?) 
                        ON DUPLICATE KEY UPDATE name = VALUES(name), min_level = VALUES(min_level), mana_cost = VALUES(mana_cost), health_cost = VALUES(health_cost), power = VALUES(power), health_bonus = VALUES(health_bonus), mana_bonus = VALUES(mana_bonus)`,
                        [item.name, item.min_level, item.mana_cost, item.health_cost, item.power, item.health_bonus, item.mana_bonus]
                    );
                    console.log(`- Item ${item.name} inserted`);
                }
                console.log(`- Items inserted from ${itemsFile}`);
            }
        } catch (err) {
            console.error("Error inserting items from file:", err);
        }
    }

    static async createHero(newHero) {
        const connection = await HeroRepository.getInstance();
        const [result] = await connection.query(
            `INSERT INTO ${Hero.tableName} (name, user_id) VALUES (?, ?, ?)`,
            [newHero.name, newHero.userId, newHero.avatar]
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
        const [result] = await connection.query(`DELETE FROM ${Hero.tableName} WHERE id = ?`, [id]);
        return result.affectedRows > 0;
    }

    static async getHeroById(id) {
        const connection = await HeroRepository.getInstance();
        const [results] = await connection.query(`SELECT * FROM ${Hero.tableName} WHERE id = ?`, [id]);
        if (results.length > 0) {
            const userData = results[0];
            return Hero.fromDatabase(userData);
        }
        return null;
    }

    static async takeDamage(id, damage) {
        const connection = await HeroRepository.getInstance();
        const [result] = await connection.query(
            `UPDATE ${Hero.tableName} SET current_health = GREATEST(current_health - ?, 0) WHERE id = ?`,
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
            `UPDATE ${Hero.tableName} SET current_health = LEAST(max_health, current_health + ?) WHERE id = ?`,
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
            `UPDATE ${Hero.tableName} SET experience = experience + ? WHERE id = ?`,
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
            `UPDATE ${Hero.tableName} SET position = ? WHERE id = ?`,
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
            `UPDATE ${Hero.tableName} 
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

    static async pickUpItem(heroId, itemId) {
        const connection = await HeroRepository.getInstance();
        await connection.query(`INSERT INTO ${Inventory.tableName} (hero_id, item_id) VALUES (?, ?)`, [heroId, itemId]);
    }

    static async dropItem(heroId, itemId) {
        const connection = await HeroRepository.getInstance();
        await connection.query(`DELETE FROM ${Inventory.tableName} WHERE hero_id = ? AND item_id = ?`, [heroId, itemId]);
    }

    static async getItemById(itemId) {
        const connection = await HeroRepository.getInstance();
        const [results] = await connection.query(`SELECT * FROM ${Item.tableName} WHERE id = ?`, [itemId]);
        return results.length > 0 ? results[0] : null;
    }

    static async getItemInInventory(heroId, itemId) {
        const connection = await HeroRepository.getInstance();
        const [results] = await connection.query(
            `SELECT * FROM ${Inventory.tableName} WHERE item_id = ? AND hero_id = ?`, [itemId, heroId]);
        return results.length > 0 ? results[0] : null;
    }

    static async getInventory(heroId) {
        const connection = await HeroRepository.getInstance();
        const [results] = await connection.query(
            `SELECT item_id
            FROM ${Inventory.tableName} AS inv 
            JOIN Item AS i ON inv.item_id = i.id 
            WHERE inv.hero_id = ?`,
            [heroId]
        );
        return results;
    }

    static async getInventory(heroId) {
        const connection = await HeroRepository.getInstance();
        const [results] = await connection.query(
            `SELECT item_id, name, min_level, mana_cost, health_cost, power, health_bonus, mana_bonus
            FROM ${Inventory.tableName} AS inv 
            JOIN Item AS i ON inv.item_id = i.id 
            WHERE inv.hero_id = ?`,
            [heroId]
        );
        return results;
    }
}

export default HeroRepository;

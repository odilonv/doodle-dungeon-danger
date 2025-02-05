import heroRepository from '../repositories/heroRepository.js';
import heroModel from '../models/heroModel.js';

export const HeroService = {
    createHero: async (name) => {

        const newHero = {
            name
        };

        try {
            const connection = await heroRepository.getInstance();
            await connection.query(
                `INSERT INTO ${heroModel.tableName} (name) VALUES (?)`,
                [newHero.name]
            );

            const [rows] = await connection.query(`SELECT LAST_INSERT_ID() as id`);
            newHero.id = rows[0].id;
            return newHero;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    deleteHero: async (id) => {
        const connection = await heroRepository.getInstance();
        const [result] = await connection.query(`DELETE FROM ${heroModel.tableName} WHERE id = ?`, [id]);
        return result.affectedRows > 0;
    },

    getHeroById: async (id) => {
        const connection = await heroRepository.getInstance();
        const [results] = await connection.query(`SELECT * FROM ${heroModel.tableName} WHERE id = ?`, [id]);
        if (results.length > 0) {
            const userData = results[0];
            return heroModel.fromDatabase(userData);
        }
        return null;
    },

    takeDamage: async (id, damage) => {
        const connection = await heroRepository.getInstance();
        const [result] = await connection.query(
            `UPDATE ${heroModel.tableName} SET current_health = GREATEST(current_health - ?, 0) WHERE id = ?`, 
            [damage, id]
        );
        if(result.affectedRows > 0) {
            const hero = await HeroService.getHeroById(id);
            if (hero.current_health === 0) {
                //HERO IS DEAD
            }
            return hero;
        }
        return null;
    },  

    heal: async (id, healthPoints) => {
        const connection = await heroRepository.getInstance();
        const [result] = await connection.query(
            `UPDATE ${heroModel.tableName} SET current_health = LEAST(max_health, current_health + ?) WHERE id = ?`, 
            [healthPoints, id]
        );

        if (result.affectedRows > 0) {
            const hero = await HeroService.getHeroById(id);
            return hero;
        }
        return null;
    },
    

    gainExperience: async (id, experiencePoints) => {
        const connection = await heroRepository.getInstance();
        const [result] = await connection.query(
            `UPDATE ${heroModel.tableName} SET experience = experience + ? WHERE id = ?`, 
            [experiencePoints, id]
        );
        if(result.affectedRows > 0) {
            const hero = await HeroService.getHeroById(id);
            return hero;
        }
        return null;
    },

    move : async (id, position) => {
        const connection = await heroRepository.getInstance();
        const positionJson = JSON.stringify(position);
        const [result] = await connection.query(
            `UPDATE ${heroModel.tableName} SET position = ? WHERE id = ?`, 
            [positionJson, id]
        );
        if(result.affectedRows > 0) {
            const hero = await HeroService.getHeroById(id);
            return hero;
        }
        return null;
    },

    nextDungeon: async (id) => {
        const connection = await heroRepository.getInstance();
        const [result] = await connection.query(
            `UPDATE ${heroModel.tableName} 
            SET current_dungeon = IFNULL(current_dungeon, 0) + 1 
            WHERE id = ?`,
            [id]
        );
        if (result.affectedRows > 0) {
            const hero = await HeroService.getHeroById(id);
            return hero;
        }
        return null;
    },    
};
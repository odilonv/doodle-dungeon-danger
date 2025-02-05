import heroRepository from '../repositories/heroRepository.js';
import heroModel from '../models/heroModel.js';

export const HeroService = {
    createHero: async (name) => {

        const newHero = {
            name
        };

        console.log("New hero", newHero);

        try {
            const connection = await heroRepository.getInstance();
            await connection.query(
                `INSERT INTO ${heroModel.tableName} (name) VALUES (?)`,
                [newHero.name]
            );

            const [rows] = await connection.query(`SELECT LAST_INSERT_ID() as id`);
            newHero.id = rows[0].id;

            console.log(newHero);

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
            console.log(`Hero ${hero.name} took ${damage} damage`, result);
            if (hero.current_health === 0) {
                console.log(`Hero ${hero.name} has no health left.`);
            }
            return true;
        }
        return false;
    },  

    heal: async (id, healthPoints) => {
        const connection = await heroRepository.getInstance();
        const [result] = await connection.query(
            `UPDATE ${heroModel.tableName} SET current_health = GREATEST(max_health, current_health + ?) WHERE id = ?`, 
            [healthPoints, id]
        );
        if(result.affectedRows > 0) {
            const hero = await HeroService.getHeroById(id);
            console.log(`Hero ${hero.name} healed ${healthPoints} hp`, result);
            return true;
        }
        return false;
    },

    gainExperience: async (id, experiencePoints) => {
        const connection = await heroRepository.getInstance();
        const [result] = await connection.query(
            `UPDATE ${heroModel.tableName} SET experience = experience + ? WHERE id = ?`, 
            [experiencePoints, id]
        );
        if(result.affectedRows > 0) {
            const hero = await HeroService.getHeroById(id);
            console.log(`Hero ${hero.name} gained ${experiencePoints} xp points`, result);
            return true;
        }
        return false;
    },

    move : async (id, position) => {
        const connection = await heroRepository.getInstance();
        const [result] = await connection.query(
            `UPDATE ${heroModel.tableName} SET position = ? WHERE id = ?`, 
            [position, id]
        );
        if(result.affectedRows > 0) {
            const hero = await HeroService.getHeroById(id);
            console.log(`Hero ${hero.name} moved to ${position}`, result);
            return true;
        }
        return false;
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
            console.log(`Hero ${hero.name} moved to next dungeon`, result);
            return true;
        }
        return false;
    },    
};
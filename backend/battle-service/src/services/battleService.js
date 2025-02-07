import battleRepository from '../repositories/battleRepository.js';
import battleModel from '../models/battleModel.js';

export const BattleService = {
    createBattle: async (heroId, dungeonId, status) => {
        const newBattle = {
            heroId,
            dungeonId,
            status
        };

        console.log("New battle", newBattle);

        try {
            const connection = await battleRepository.getInstance();
            await connection.query(
                `INSERT INTO ${battleModel.tableName} (heroId, dungeonId, status) VALUES (?, ?, ?)`,
                [newBattle.heroId, newBattle.dungeonId, newBattle.status]
            );

            const [rows] = await connection.query(`SELECT LAST_INSERT_ID() as id`);
            newBattle.id = rows[0].id;

            console.log(newBattle);

            return newBattle;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getBattleById: async (id) => {
        const connection = await battleRepository.getInstance();
        const [results] = await connection.query(`SELECT * FROM ${battleModel.tableName} WHERE id = ?`, [id]);
        if (results.length > 0) {
            const battleData = results[0];
            return battleModel.fromDatabase(battleData);
        }
        return null;
    },

    deleteBattle: async (battleId) => {
        const connection = await battleRepository.getInstance();
        const [result] = await connection.query(`DELETE FROM ${battleModel.tableName} WHERE id = ?`, [battleId]);
        return result.affectedRows > 0;
    },

    getMonsterById: async (id) => {
        const connection = await battleRepository.getInstance();
        const [results] = await connection.query(`SELECT * FROM ${battleModel.tableName} WHERE id = ?`, [id]);
        if (results.length > 0) {
            const battleData = results[0];
            return battleModel.fromDatabase(battleData);
        }
        return null;
    },
};

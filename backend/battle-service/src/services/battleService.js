import battleRepository from '../repositories/battleRepository.js';
import battleModel from '../models/battleModel.js';

export const BattleService = {
    createBattle: async (heroId, monsterInstanceId, dungeonInstanceId) => {
        try {
            const connection = await battleRepository.getInstance();
            await connection.query(
                `INSERT INTO ${battleModel.tableName} (hero_id, dungeon_instance_id, monsterInstanceId) VALUES (?, ?, ?)`,
                [heroId, dungeonInstanceId, monsterInstanceId]
            );

            const [results] = await connection.query(`SELECT * FROM ${battleModel.tableName} WHERE hero_id = ?`, [heroId]);
            if (results.length > 0) {
                const battleData = results[0];
                return battleModel.fromDatabase(battleData);
            }
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

    getCurrentBattleByHeroId: async (heroId) => {
        const connection = await battleRepository.getInstance();
        const [results] = await connection.query(`SELECT * FROM ${battleModel.tableName} WHERE hero_id = ? AND result = ?`, [heroId, battleModel.BattleResult.ONGOING]);
        if (results.length > 0) {
            const battleData = results[0];
            return battleModel.fromDatabase(battleData);
        }
        return null;
    },

    getBattleByMonsterInstanceId: async (monsterInstanceId) => {
        const connection = await battleRepository.getInstance();
        const [results] = await connection.query(`SELECT * FROM ${battleModel.tableName} WHERE monsterInstanceId = ?`, [monsterInstanceId]);
        if (results.length > 0) {
            const battleData = results[0];
            return battleModel.fromDatabase(battleData);
        }
        return null;
    },

    getMonsterInstanceIdInBattle: async (battleId) => {
        const connection = await battleRepository.getInstance();
        const [results] = await connection.query(`SELECT monsterInstanceId FROM ${battleModel.tableName} WHERE id = ?`, [battleId]);
        if (results.length > 0) {
            return results[0].monsterInstanceId;
        }
        return null;
    },

    updateBattleStatus: async (battleId, status) => {
        const connection = await battleRepository.getInstance();
        const [result] = await connection.query(`UPDATE ${battleModel.tableName} SET result = ? WHERE id = ?`, [status, battleId]);
        return result.affectedRows > 0;
    },

    battleAlreadyExists: async (heroId, dungeonInstanceId, monsterInstanceId) => {
        const connection = await battleRepository.getInstance();
        const [results] = await connection.query(
            `SELECT * FROM ${battleModel.tableName} WHERE hero_id = ? AND dungeon_instance_id = ? AND monsterInstanceId = ?`,
            [heroId, dungeonInstanceId, monsterInstanceId]
        );
        return results.length > 0;
    },
};

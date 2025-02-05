import monsterRepository from '../repositories/monsterRepository.js';
import {Monster, MonsterInstance} from '../models/monsterModel.js';

export const MonsterService = {
    getMonsterById: async (id) => {
        try {
            const connection = await monsterRepository.getInstance();
            const [results] = await connection.query(`SELECT * FROM ${Monster.tableName} WHERE id = ?`, [id]);
            
            if (results.length > 0) {
                return Monster.fromDatabase(results[0]);
            }
            
            return null;
        } catch (error) {
            console.error("Error fetching monster:", error);
            throw error;
        }
    }
};

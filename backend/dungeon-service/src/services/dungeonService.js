import dungeonRepository from '../repositories/dungeonRepository.js';
import { Dungeon, DungeonInstance } from '../models/dungeonModel.js';

export const DungeonService = {
    getDungeonById: async (id) => {
        try {
            const connection = await dungeonRepository.getInstance();
            const [results] = await connection.query(`SELECT * FROM ${Dungeon.tableName} WHERE id = ?`, [id]);
            
            if (results.length > 0) {
                return Dungeon.fromDatabase(results[0]);
            }
            
            return null;
        } catch (error) {
            console.error("Error fetching dungeon:", error);
            throw error;
        }
    },

    getDungeonInstanceById: async (id) => {
        try {
            const connection = await dungeonRepository.getInstance();
            const [results] = await connection.query(`SELECT * FROM ${DungeonInstance.tableName} WHERE id = ?`, [id]);
            
            if (results.length > 0) {
                return DungeonInstance.fromDatabase(results[0]);
            }
            
            return null;
        } catch (error) {
            console.error("Error fetching dungeon instance:", error);
            throw error;
        }
    }
};

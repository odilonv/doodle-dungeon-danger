import dungeonRepository from '../repositories/dungeonRepository.js';
import { Dungeon, DungeonInstance } from '../models/dungeonModel.js';

export const DungeonService = {
    getDungeonById: async (id) => {
        try {
            const dungeonData = await dungeonRepository.getDungeonById(id);
            if (dungeonData) {
                return Dungeon.fromDatabase(dungeonData);
            }
            return null;
        } catch (error) {
            console.error("Error fetching dungeon:", error);
            throw error;
        }
    },

    getDungeonInstanceById: async (id) => {
        try {
            const dungeonInstanceData = await dungeonRepository.getDungeonInstanceById(id);
            if (dungeonInstanceData) {
                return DungeonInstance.fromDatabase(dungeonInstanceData);
            }
            return null;
        } catch (error) {
            console.error("Error fetching dungeon instance:", error);
            throw error;
        }
    },

    createDungeonInstance: async (id) => {
        try {
            const instanceId = await dungeonRepository.createDungeonInstance(id);
            return instanceId;
        } catch (error) {
            console.error("Error creating dungeon instance:", error);
            throw error;
        }
    },

    deleteDungeonInstance: async (id) => {
        try {
            const result = await dungeonRepository.deleteDungeonInstance(id);
            return result;
        } catch (error) {
            console.error("Error deleting dungeon instance:", error);
            throw error;
        }
    },
};

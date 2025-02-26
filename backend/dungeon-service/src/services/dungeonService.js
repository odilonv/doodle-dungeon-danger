import dungeonRepository from '../repositories/dungeonRepository.js';
import { Dungeon, DungeonInstance } from '../models/dungeonModel.js';
import { getCurrentUserDungeon } from '../controllers/dungeonController.js';

export const DungeonService = {
    getDungeons: async () => {
        try {
            const dungeonsData = await dungeonRepository.getDungeons();
            const dungeons = dungeonsData.map((dungeonData) => Dungeon.fromDatabase(dungeonData));
            return dungeons;
        } catch (error) {
            console.error("Error fetching dungeons:", error);
            throw error;
        }
    },

    getCurrentUserDungeon: async (userId) => {
        try {
            const dungeonData = await dungeonRepository.getCurrentUserDungeon(userId);
            if (dungeonData) {
                return DungeonInstance.fromDatabase(dungeonData);
            }
            return null;
        } catch (error) {
            console.error("Error fetching current user dungeon:", error);
            throw error;
        }
    },

    getUserDungeons: async (userId) => {
        try {
            const dungeonsData = await dungeonRepository.getUserDungeons(userId);
            const dungeons = dungeonsData.map((dungeonData) => DungeonInstance.fromDatabase(dungeonData));
            return dungeons;
        } catch (error) {
            console.error("Error fetching user dungeons:", error);
            throw error;
        }
    },

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

    createDungeonInstance: async (userId, dungeonId) => {
        try {
            const instanceId = await dungeonRepository.createDungeonInstance(userId, dungeonId);
            return instanceId;
        } catch (error) {
            console.error("Error creating dungeon instance:", error);
            throw error;
        }
    },

    completeDungeonInstance: async (userId, dungeonId) => {
        try {
            const result = await dungeonRepository.completeDungeonInstance(userId, dungeonId);
            return result;
        } catch (error) {
            console.error("Error completing dungeon instance:", error);
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

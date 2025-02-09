import monsterRepository from '../repositories/monsterRepository.js';
import {Monster, MonsterInstance} from '../models/monsterModel.js';

export const MonsterService = {
    getMonsterById: async (id) => {
        try {
            return await monsterRepository.getMonsterById(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getMonstersByDungeonInstanceId: async (id) => {
        try {
            return await monsterRepository.getMonstersByDungeonInstanceId(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getMonsterInstanceById: async (id) => {
        try {
            const monsterInstance = await monsterRepository.getMonsterInstanceById(id);
            return monsterInstance;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    takeDamage: async (id, damage) => {
        try {
            const monster = await monsterRepository.takeDamage(id, damage);
            return monster;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    createMonsterInstance: async (monsterId, dungeonInstanceId, position) => {
        try {
            const monsterInstance = await monsterRepository.createMonsterInstance(monsterId, dungeonInstanceId, position);
            return monsterInstance;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    deleteMonsterInstance: async (id) => {
        try {
            const monsterInstance = await monsterRepository.deleteMonsterInstance(id);
            return monsterInstance;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    move: async (id, position) => {
        try {
            return await monsterRepository.move(id, position);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

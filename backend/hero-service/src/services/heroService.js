import heroRepository from '../repositories/heroRepository.js';
import { Item } from '../models/heroModel.js';

export const HeroService = {
    createHero: async (name, userId, avatar) => {
        try {
            const newHero = {
                name,
                userId,
                avatar,
                position: { x: 0, y: 0 }
            };
            const hero = await heroRepository.createHero(newHero);
            await heroRepository.pickUpItem(hero.id, 1); //sword
            await heroRepository.pickUpItem(hero.id, 2); //health potion
            return hero;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    deleteHero: async (id) => {
        try {
            return await heroRepository.deleteHero(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getHeroById: async (id) => {
        try {
            return await heroRepository.getHeroById(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getCurrentHeroByUserId: async (userId) => {
        try {
            return await heroRepository.getCurrentHeroByUserId(userId);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },


    takeDamage: async (id, damage) => {
        try {
            const hero = await heroRepository.takeDamage(id, damage);
            if (hero && hero.current_health === 0) {
                // HERO IS DEAD
            }
            return hero;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    heal: async (id, healthPoints) => {
        try {
            return await heroRepository.heal(id, healthPoints);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    gainExperience: async (id, experiencePoints) => {
        try {
            return await heroRepository.gainExperience(id, experiencePoints);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    move: async (id, position) => {
        try {
            return await heroRepository.move(id, position);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    nextDungeon: async (id) => {
        try {
            return await heroRepository.nextDungeon(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    pickUpItem: async (heroId, itemId) => {
        try {
            return await heroRepository.pickUpItem(heroId, itemId);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    dropItem: async (heroId, itemId) => {
        try {
            return await heroRepository.dropItem(heroId, itemId);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    useItem: async (heroId, itemId) => {
        try {
            let hero = await heroRepository.getHeroById(heroId);
            const item = Item.fromDatabase(await heroRepository.getItemById(itemId));
            if(item.healthBonus) {
                hero = await heroRepository.heal(heroId, item.healthBonus);
            }
            if(item.healthCost) {
                hero = await heroRepository.takeDamage(heroId, item.healthCost);
            }
            return hero;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getItemById: async (id) => {
        try {
            return await heroRepository.getItemById(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getItemInInventory: async (heroId, itemId) => {
        try {
            return await heroRepository.getItemInInventory(heroId, itemId);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    exitDungeon: async (id) => {
        try {
            return await heroRepository.exitDungeon(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    updatePosition: async (id, position) => {
        try {
            return await heroRepository.updatePosition(id, position);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getInventory: async (heroId) => {
        try {
            return await heroRepository.getInventory(heroId);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};

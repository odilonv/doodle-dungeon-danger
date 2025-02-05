import heroRepository from '../repositories/heroRepository.js';
import heroModel from '../models/heroModel.js';

export const HeroService = {
    createHero: async (name) => {
        try {
            const newHero = {
                name
            };

            const hero = await heroRepository.createHero(newHero);
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
    }
};

import { UserService as Hero } from '../services/heroService.js';

export const getHeroes = async (req, res) => {
    try {
        const heroes = await Hero.getHeroes();
        res.json(heroes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const getHeroById = async (req, res) => {
    const { id } = req.params;
    try {
        const hero = await Hero.getHeroById(id);
        if (hero) {
            res.json(hero);
        } else {
            res.status(404).json({ message: 'Hero not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const createHero = async (req, res) => {
    const { firstName, lastName, email, password } = req.body.user;
    try {
        const newHero = await Hero.createHero(firstName, lastName, email, password);
        res.status(201).json(newHero);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const updateHero = (req, res) => {
    const { userId } = req.params;
    const { username, email } = req.body;
    const updatedHero = Hero.updateHero(userId, username, email);
    if (updatedHero) {
        res.json(updatedHero);
    } else {
        res.status(404).json({ message: 'Hero not found' });
    }
};

export const deleteHero = async (req, res) => {
    const { userId, password } = req.body;
    try {
        const success = await Hero.deleteHero(userId, password);
        console.log(success);
        if (success) {
            res.status(200).json({ message: 'Hero deleted successfully' });
        } else {
            res.status(404).json({ message: 'Hero not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

import { HeroService } from '../services/heroService.js';

export const getHeroById = async (req, res) => {
    const { id } = req.params;
    try {
        const hero = await HeroService.getHeroById(id);
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
    const { name } = req.body.hero;
    try {
        const newHero = await HeroService.createHero(name);
        res.status(201).json(newHero);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteHero = async (req, res) => {
    const { userId, password } = req.body;
    try {
        const success = await HeroService.deleteHero(userId, password);
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
export const takeDamage = async (req, res) => {
    const { id } = req.params;
    const { damage } = req.body;

    if (!damage || typeof damage !== 'number' || damage <= 0) {
        return res.status(400).json({ message: 'Invalid damage value' });
    }

    try {
        const damagedHero = await HeroService.takeDamage(id, damage);
        if (damagedHero) {
            res.json(damagedHero);
        } else {
            res.status(404).json({ message: 'Hero not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const heal = async (req, res) => {
    const { id } = req.params;
    const { healthPoints } = req.body;

    if (!healthPoints || typeof healthPoints !== 'number' || healthPoints <= 0) {
        return res.status(400).json({ message: 'Invalid healthPoints value' });
    }

    try {
        const healedHero = await HeroService.heal(id, healthPoints);
        if (healedHero) {
            res.json(healedHero);
        } else {
            res.status(404).json({ message: 'Hero not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const gainExperience = async (req, res) => {
    const { id } = req.params;
    const { experiencePoints } = req.body;

    if (!experiencePoints || typeof experiencePoints !== 'number' || experiencePoints <= 0) {
        return res.status(400).json({ message: 'Invalid experiencePoints value' });
    }

    try {
        const updatedHero = await HeroService.gainExperience(id, experiencePoints);
        if (updatedHero) {
            res.json(updatedHero);
        } else {
            res.status(404).json({ message: 'Hero not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const move = async (req, res) => {
    const { id } = req.params;
    const { position } = req.body;

    if (
        !position || 
        typeof position !== 'object' || 
        typeof position.x !== 'number' || 
        typeof position.y !== 'number'
    ) {
        return res.status(400).json({ message: 'Invalid position format. Expected { "position": { "x": number, "y": number } }' });
    }

    try {
        const updatedHero = await HeroService.move(id, position);
        if (updatedHero) {
            res.json(updatedHero);
        } else {
            res.status(404).json({ message: 'Hero not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const nextDungeon = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedHero = await HeroService.nextDungeon(id);
        if (updatedHero) {
            res.json(updatedHero);
        } else {
            res.status(404).json({ message: 'Hero not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

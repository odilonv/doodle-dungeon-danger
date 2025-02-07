import { HeroService } from '../services/heroService.js';
import { sendHeroProgression } from '../rabbitmq/publisher.js';

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

export const getCurrentHeroByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const hero = await HeroService.getCurrentHeroByUserId(userId);
        if (hero) {
            res.json(hero);
        } else {
            res.status(404).json({ message: 'No hero found for this user' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


export const createHero = async (req, res) => {
    const { name, userId, avatar } = req.body;

    try {
        const newHero = await HeroService.createHero(name, userId, avatar);
        res.status(201).json(newHero);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteHero = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedHero = await HeroService.deleteHero(id);
        if (deletedHero) {
            res.json(deletedHero);
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
            await sendHeroProgression(updatedHero.userId, updatedHero.currentDungeon);
        } else {
            res.status(404).json({ message: 'Hero not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const pickUpItem = async (req, res) => {
    const { heroId, itemId } = req.params;
    if (!await HeroService.getItemById(itemId)) {
        return res.status(400).json({ message: 'Item not found' });
    }
    if (!await HeroService.getHeroById(heroId)) {
        return res.status(400).json({ message: 'Hero not found' });
    }
    if (await HeroService.getItemInInventory(heroId, itemId)) {
        return res.status(400).json({ message: 'Item already in inventory' });
    }
    try {
        await HeroService.pickUpItem(heroId, itemId);
        res.status(200).json({ message: 'Item picked up successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const dropItem = async (req, res) => {
    const { heroId, itemId } = req.params;
    if (!await HeroService.getItemById(itemId)) {
        return res.status(400).json({ message: 'Item not found' });
    }
    if (!await HeroService.getHeroById(heroId)) {
        return res.status(400).json({ message: 'Hero not found' });
    }
    if (!await HeroService.getItemInInventory(heroId, itemId)) {
        return res.status(400).json({ message: 'Item not in inventory' });
    }
    try {
        await HeroService.dropItem(heroId, itemId);
        res.status(200).json({ message: 'Item dropped successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const useItem = async (req, res) => {
    const { heroId, itemId } = req.params;
    if (!await HeroService.getItemById(itemId)) {
        return res.status(400).json({ message: 'Item not found' });
    }
    if (!await HeroService.getHeroById(heroId)) {
        return res.status(400).json({ message: 'Hero not found' });
    }
    if (!await HeroService.getItemInInventory(heroId, itemId)) {
        return res.status(400).json({ message: 'Item not in inventory' });
    }
    try {
        const item = await HeroService.getItemById(itemId);
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getItemById = async (req, res) => {
    const { id } = req.params;
    if (!await HeroService.getItemById(id)) {
        return res.status(400).json({ message: 'Item not found' });
    }
    try {
        const item = await HeroService.getItemById(id);
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getItemInInventory = async (req, res) => {
    const { heroId, itemId } = req.params;
    if (!await HeroService.getItemById(itemId)) {
        return res.status(400).json({ message: 'Item not found' });
    }
    if (!await HeroService.getHeroById(heroId)) {
        return res.status(400).json({ message: 'Hero not found' });
    }
    try {
        const item = await HeroService.getItemInInventory(heroId, itemId);
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getInventory = async (req, res) => {
    const { heroId } = req.params;
    if (!await HeroService.getHeroById(heroId)) {
        return res.status(400).json({ message: 'Hero not found' });
    }
    try {
        const inventory = await HeroService.getInventory(heroId);
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


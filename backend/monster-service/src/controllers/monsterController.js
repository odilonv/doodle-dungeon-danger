import { MonsterService } from '../services/monsterService.js';

export const getMonsterById = async (req, res) => {
    const { id } = req.params;
    try {
        const monster = await MonsterService.getMonsterById(id);
        if (monster) {
            res.json(monster);
        } else {
            res.status(404).json({ message: 'Monster not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const getMonstersByDungeonInstanceId = async (req, res) => {
    const { id } = req.params;
    try {
        const monsters = await MonsterService.getMonstersByDungeonInstanceId(id);
        res.json(monsters);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const getMonsterInstanceById = async (req, res) => {
    const { id } = req.params;
    try {
        const monsterInstance = await MonsterService.getMonsterInstanceById(id);
        if (monsterInstance) {
            res.json(monsterInstance);
        } else {
            res.status(404).json({ message: 'Monster instance not found' });
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
        const damagedMonster = await MonsterService.takeDamage(id, damage);
        if (damagedMonster) {
            res.json(damagedMonster);
        } else {
            res.status(404).json({ message: 'Monster not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const createMonsterInstance = async (req, res) => {
    const { monsterId, dungeonInstanceId, position } = req.body;
    if (!monsterId || typeof monsterId !== 'number' || monsterId <= 0) {
        return res.status(400).json({ message: 'Invalid monsterId value' });
    }
    if (!dungeonInstanceId || typeof dungeonInstanceId !== 'number' || dungeonInstanceId <= 0) {
        return res.status(400).json({ message: 'Invalid dungeonInstanceId value' });
    }
    if(!await MonsterService.getMonsterById(monsterId)) {
        return res.status(400).json({ message: 'Monster not found' });
    }
    try {
        const monsterInstance = await MonsterService.createMonsterInstance(monsterId, dungeonInstanceId, position);
        res.status(201).json(monsterInstance);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const deleteMonsterInstance = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await MonsterService.deleteMonsterInstance(id);
        if (result) {
            res.json({ message: 'Monster instance deleted' });
        } else {
            res.status(404).json({ message: 'Monster instance not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

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
        const monsterInstance = await MonsterService.move(id,position);
        if (monsterInstance) {
            res.json(monsterInstance);
        } else {
            res.status(404).json({ message: 'Monster instance not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

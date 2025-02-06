import { DungeonService } from '../services/dungeonService.js';

export const getDungeonById = async (req, res) => {
    const { id } = req.params;
    try {
        const dungeon = await DungeonService.getDungeonById(id);
        if (dungeon) {
            res.json(dungeon);
        } else {
            res.status(404).json({ message: 'Dungeon not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const getDungeonInstanceById = async (req, res) => {
    const { id } = req.params;
    try {
        const dungeonInstance = await DungeonService.getDungeonInstanceById(id);
        if (dungeonInstance) {
            res.json(dungeonInstance);
        } else {
            res.status(404).json({ message: 'Dungeon instance not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const createDungeonInstance = async (req, res) => {
    const { id } = req.params;
    try {
        const dungeonInstance = await DungeonService.createDungeonInstance(id);
        res.json(dungeonInstance);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteDungeonInstance = async (req, res) => {
    const { id } = req.params;
    try {
        const dungeonInstance = await DungeonService.deleteDungeonInstance(id);
        res.json(dungeonInstance);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

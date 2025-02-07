import { DungeonService } from '../services/dungeonService.js';

export const getDungeons = async (req, res) => {
    try {
        const dungeons = await DungeonService.getDungeons();
        res.json(dungeons);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const getCurrentUserDungeon = async (req, res) => {
    const { userId } = req.params;
    try {
        const lastDungeonInstance = await DungeonService.getCurrentUserDungeon(userId);
        if (!lastDungeonInstance) {
            res.status(404).json({ message: 'No dungeon instance found for this user' });
        }
        else{
            const dungeon = await DungeonService.getDungeonById(lastDungeonInstance.dungeonId);
            res.json({ dungeon: dungeon, dungeonInstance: lastDungeonInstance });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const getUserDungeons = async (req, res) => {
    const { userId } = req.params;
    try {
        const dungeons = await DungeonService.getUserDungeons(userId);
        res.json(dungeons);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

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

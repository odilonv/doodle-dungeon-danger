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
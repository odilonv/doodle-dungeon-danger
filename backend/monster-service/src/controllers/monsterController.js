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
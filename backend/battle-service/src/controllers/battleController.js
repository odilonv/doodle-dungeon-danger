import { BattleService } from '../services/battleService.js';

export const getBattleById = async (req, res) => {
    const { id } = req.params;
    try {
        const battle = await BattleService.getBattleById(id);
        if (battle) {
            res.json(battle);
        } else {
            res.status(404).json({ message: 'Battle not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

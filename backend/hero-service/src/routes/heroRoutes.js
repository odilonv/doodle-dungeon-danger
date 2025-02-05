import express from 'express';
import { getHeroById,
    createHero,
    deleteHero,
    takeDamage,
    heal, 
    gainExperience,
    move,
    nextDungeon 
} from '../controllers/heroController.js';

export const heroRouter = express.Router();

heroRouter.post('/', createHero);
heroRouter.get('/:id', getHeroById);
heroRouter.put('/takeDamage/:id', takeDamage);
heroRouter.put('/heal/:id', heal);
heroRouter.put('/gainExperience/:id', gainExperience);
heroRouter.put('/move/:id', move);
heroRouter.post('/nextDungeon/:id', nextDungeon);
heroRouter.delete('/', deleteHero);

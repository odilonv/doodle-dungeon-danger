import express from 'express';
import { getMonsterById,
    getMonsterInstanceById,
    takeDamage,
    createMonsterInstance,
    deleteMonsterInstance,
    move
} from '../controllers/monsterController.js';

export const monsterRouter = express.Router();

monsterRouter.get('/:id', getMonsterById);
monsterRouter.post('/instance', createMonsterInstance);
monsterRouter.delete('/instance/:id', deleteMonsterInstance);
monsterRouter.put('/instance/takeDamage/:id', takeDamage);
monsterRouter.get('/instance/:id', getMonsterInstanceById);
monsterRouter.put('/instance/move/:id', move);
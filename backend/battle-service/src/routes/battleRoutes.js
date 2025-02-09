import express from 'express';
import { 
    getBattleById,
    createBattle
 } from '../controllers/battleController.js';

export const battleRouter = express.Router();

battleRouter.get('/:id', getBattleById);
battleRouter.post('/', createBattle);
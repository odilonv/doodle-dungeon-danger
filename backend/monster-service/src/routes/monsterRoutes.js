import express from 'express';
import { getMonsterById } from '../controllers/monsterController.js';

export const monsterRouter = express.Router();

monsterRouter.get('/:id', getMonsterById);
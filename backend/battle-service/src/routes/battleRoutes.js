import express from 'express';
import { getBattleById } from '../controllers/battleController.js';

export const battleRouter = express.Router();

battleRouter.get('/:id', getBattleById);
import express from 'express';
import { getDungeonById } from '../controllers/dungeonController.js';

export const dungeonRouter = express.Router();

dungeonRouter.get('/:id', getDungeonById);
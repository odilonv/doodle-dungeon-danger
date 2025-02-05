import express from 'express';
import { 
    getDungeonById,
    getDungeonInstanceById,
    createDungeonInstance,
    deleteDungeonInstance,
 } from '../controllers/dungeonController.js';

export const dungeonRouter = express.Router();

dungeonRouter.get('/:id', getDungeonById);
dungeonRouter.get('/instance/:id', getDungeonInstanceById);
dungeonRouter.post('/instance/:id', createDungeonInstance);
dungeonRouter.delete('/instance/:id', deleteDungeonInstance);
import express from 'express';
import { 
    getDungeons,
    getUserDungeons,
    getDungeonById,
    getDungeonInstanceById,
    createDungeonInstance,
    deleteDungeonInstance,
 } from '../controllers/dungeonController.js';

export const dungeonRouter = express.Router();

dungeonRouter.get('/', getDungeons);
dungeonRouter.get('/user/:userId', getUserDungeons);
dungeonRouter.get('/:id', getDungeonById);
dungeonRouter.get('/instance/:id', getDungeonInstanceById);
dungeonRouter.post('/instance', createDungeonInstance);
dungeonRouter.delete('/instance/:id', deleteDungeonInstance);
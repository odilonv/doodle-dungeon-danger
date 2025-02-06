import express from 'express';
import { 
    getDungeons,
    getUserDungeons,
    getDungeonById,
    getDungeonInstanceById,
    createDungeonInstance,
    deleteDungeonInstance,
    getCurrentUserDungeon
 } from '../controllers/dungeonController.js';

export const dungeonRouter = express.Router();

dungeonRouter.get('/', getDungeons);
dungeonRouter.get('/:id', getDungeonById);
dungeonRouter.get('/instances/user/:userId', getUserDungeons);
dungeonRouter.get('/lastInstance/user/:userId', getCurrentUserDungeon);
dungeonRouter.get('/instance/:id', getDungeonInstanceById);
dungeonRouter.post('/instance', createDungeonInstance);
dungeonRouter.delete('/instance/:id', deleteDungeonInstance);
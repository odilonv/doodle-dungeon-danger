import express from 'express';
import { getHeroes, getHeroById, createHero, updateHero, deleteHero } from '../controllers/heroController.js';

export const heroRouter = express.Router();

heroRouter.post('/', createHero);
heroRouter.get('/', getHeroes);
heroRouter.get('/:id', getHeroById);
heroRouter.put('/:id', updateHero);
heroRouter.delete('/', deleteHero);

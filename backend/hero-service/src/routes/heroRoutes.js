import express from 'express';
import {
  getHeroById,
  createHero,
  deleteHero,
  takeDamage,
  heal,
  gainExperience,
  move,
  nextDungeon,
  finishDungeon,
  pickUpItem,
  dropItem,
  useItem,
  getItemById,
  getInventory,
  getCurrentHeroByUserId
} from '../controllers/heroController.js';

export const heroRouter = express.Router();

heroRouter.post('/', createHero);
heroRouter.get('/:id', getHeroById);
heroRouter.get('/user/:userId/currentHero', getCurrentHeroByUserId);
heroRouter.put('/move/:id', move);
heroRouter.post('/nextDungeon/:id', nextDungeon);
heroRouter.post('/finishDungeon/:id', finishDungeon);
heroRouter.delete('/:id', deleteHero);

heroRouter.post('/iventory/pickUpItem/hero/:heroId/item/:itemId', pickUpItem);
heroRouter.post('/iventory/dropItem/hero/:heroId/item/:itemId', dropItem);
heroRouter.post('/iventory/useItem/hero/:heroId/item/:itemId', useItem);
heroRouter.get('/iventory/hero/:heroId', getInventory);

heroRouter.get('/item/:id', getItemById);




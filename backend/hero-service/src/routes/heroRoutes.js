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
  pickUpItem,
  dropItem,
  useItem,
  getItemById,
  getInventory
} from '../controllers/heroController.js';

export const heroRouter = express.Router();

heroRouter.post('/', createHero);
heroRouter.get('/:id', getHeroById);
heroRouter.put('/takeDamage/:id', takeDamage);
heroRouter.put('/heal/:id', heal);
heroRouter.put('/gainExperience/:id', gainExperience);
heroRouter.put('/move/:id', move);
heroRouter.post('/nextDungeon/:id', nextDungeon);
heroRouter.delete('/:id', deleteHero);

heroRouter.post('/iventory/pickUpItem/hero/:heroId/item/:itemId', pickUpItem);
heroRouter.post('/iventory/dropItem/hero/:heroId/item/:itemId', dropItem);
heroRouter.post('/iventory/useItem/hero/:heroId/item/:itemId', useItem);
heroRouter.get('/iventory/hero/:heroId', getInventory);

heroRouter.get('/item/:id', getItemById);




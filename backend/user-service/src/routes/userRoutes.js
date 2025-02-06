import express from 'express';

export const userRouter = express.Router();

import {
  createUser,
  loginUser,
  sessionUser,
  updateUser,
  logoutUser,
  deleteUser,
  getUserById
} from '../controllers/userController.js';

userRouter.post('/', createUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', logoutUser);
userRouter.get('/session', sessionUser);
userRouter.get('/:id', getUserById);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);
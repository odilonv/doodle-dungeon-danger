import express from 'express';
import { createUser, loginUser, sessionUser, updateUser, logoutUser, deleteUser, IdUser } from '../controllers/userController.js';

export const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', logoutUser);
userRouter.delete('/', deleteUser);
userRouter.get('/session', sessionUser);
userRouter.get('/:id', IdUser);
userRouter.put('/:id', updateUser);

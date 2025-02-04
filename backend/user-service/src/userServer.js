import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/userRoutes.js';
import session from 'express-session';

const app = express();
const PORT = 5001; 

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.json());

app.use('/users', userRouter);

export const startUsersService = () => {
    app.listen(PORT, () => {
        console.log(`Users service is running on port ${PORT}`);
    });
};

startUsersService();
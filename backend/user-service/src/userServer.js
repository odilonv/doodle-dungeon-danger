import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/userRoutes.js';
import session from 'express-session';
import userRepository from './repositories/userRepository.js';

const app = express();
app.use(express.json());

const PORT = 5001;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, 
        secure: false, 
        sameSite: 'lax' 
    }
}));

app.use('/users', userRouter);

export const startUsersService = async () => {
    try {
        await userRepository.getInstance();
        console.log('User service database initialized');
        app.listen(PORT, () => {
            console.log(`User service is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error initializing the database:', error);
    }
};

startUsersService();
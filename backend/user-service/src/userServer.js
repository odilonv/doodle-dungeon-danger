import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/userRoutes.js';
import session from 'express-session';

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
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true, 
        secure: false, 
        sameSite: 'lax' 
    }
}));

app.use('/users', userRouter);

export const startUsersService = () => {
    app.listen(PORT, () => {
        console.log(`Users service is running on port ${PORT}`);
    });
};

startUsersService();
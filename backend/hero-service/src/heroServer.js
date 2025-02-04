import express from 'express';
import cors from 'cors';
import { heroRouter } from './routes/heroRoutes.js';
import session from 'express-session';

const app = express();
const PORT = 5002;

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

app.use('/heroes', heroRouter);

export const startHeroesService = () => {
    app.listen(PORT, () => {
        console.log(`Heroes service is running on port ${PORT}`);
    });
};

startHeroesService();
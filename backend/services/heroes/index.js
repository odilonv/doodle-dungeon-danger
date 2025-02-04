import express from 'express';
import cors from 'cors';
import { userRouter } from './heroRoutes.js';
import session from 'express-session';
import userRepository from './heroRepository.js';

const app = express();
const PORT = 5002; // Port pour le service héro

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

// Montage des routes du service utilisateur
app.use('/users', userRouter);

// Point d'entrée pour le service utilisateur
export const startUsersService = () => {
    app.listen(PORT, () => {
        console.log(`Users service is running on port ${PORT}`);
    });
};
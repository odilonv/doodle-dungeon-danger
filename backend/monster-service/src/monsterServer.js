import express from 'express';
import cors from 'cors';
import { monsterRouter } from './routes/monsterRoutes.js';

const app = express();
app.use(express.json());

const PORT = 5005;

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use('/monsters', monsterRouter);

export const startMonsterService = () => {
    app.listen(PORT, () => {
        console.log(`Monster service is running on port ${PORT}`);
    });
};

startMonsterService();

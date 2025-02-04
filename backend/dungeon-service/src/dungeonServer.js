import express from 'express';
import cors from 'cors';
import { dungeonRouter } from './routes/dungeonRoutes.js';

const app = express();
app.use(express.json());

const PORT = 5003;

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use('/dungeons', dungeonRouter);

export const startDungeonService = () => {
    app.listen(PORT, () => {
        console.log(`Dungeon service is running on port ${PORT}`);
    });
};

startDungeonService();

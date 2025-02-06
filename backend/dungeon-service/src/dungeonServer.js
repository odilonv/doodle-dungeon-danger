import express from 'express';
import cors from 'cors';
import { dungeonRouter } from './routes/dungeonRoutes.js';
import dungeonRepository from './repositories/dungeonRepository.js';

const app = express();
app.use(express.json());

const PORT = 5003;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use('/dungeons', dungeonRouter);

export const startDungeonService = async () => {
    try {
        await dungeonRepository.getInstance();
        console.log('Dungeon service database initialized');
        app.listen(PORT, () => {
            console.log(`Dungeon service is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error initializing the database:', error);
    }
};

startDungeonService();

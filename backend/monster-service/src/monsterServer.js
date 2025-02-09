import express from 'express';
import cors from 'cors';
import { monsterRouter } from './routes/monsterRoutes.js';
import monsterRepository from './repositories/monsterRepository.js';
import { consumeHeroDamage } from './rabbitmq/consumer.js';

const app = express();
app.use(express.json());

const PORT = 5005;

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use('/monsters', monsterRouter);

export const startMonsterService = async () => {
    try {
        await monsterRepository.getInstance();
        console.log('Monster service database initialized');
        app.listen(PORT, () => {
            console.log(`Monster service is running on port ${PORT}`);
        });
        consumeHeroDamage();
    } catch (error) {
        console.error('Error initializing the database:', error);
    }
};

startMonsterService();

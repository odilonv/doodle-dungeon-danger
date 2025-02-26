import express from 'express';
import cors from 'cors';
import { heroRouter } from './routes/heroRoutes.js';
import heroRepository from './repositories/heroRepository.js';
import { consumeHeroDamageTaken, consumeMonsterXP } from './rabbitmq/consumer.js';

const app = express();
app.use(express.json());

const PORT = 5002;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use('/heroes', heroRouter);

export const startHeroService = async () => {
    try {
        await heroRepository.getInstance();
        console.log('Hero service database initialized');
        app.listen(PORT, () => {
            console.log(`Hero service is running on port ${PORT}`);
        });
        consumeHeroDamageTaken();
        consumeMonsterXP();
    } catch (error) {
        console.error('Error initializing the database:', error);
    }
};

startHeroService();
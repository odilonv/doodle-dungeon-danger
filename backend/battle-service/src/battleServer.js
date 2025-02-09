import express from 'express';
import cors from 'cors';
import { battleRouter } from './routes/battleRoutes.js';
import battleRepository from './repositories/battleRepository.js';
import { consumeItemInfo, consumeMonsterXP, consumeMonsterPower, consumeHeroDied } from './rabbitmq/consumer.js';

const app = express();
app.use(express.json());

const PORT = 5004;

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use('/battles', battleRouter);

export const startBattleService = async () => {
    try {
        await battleRepository.getInstance();
        console.log('Battle service database initialized');
        app.listen(PORT, () => {
            console.log(`Battle service is running on port ${PORT}`);
        });
        consumeItemInfo();
        consumeMonsterPower();
        consumeMonsterXP();
        consumeHeroDied();
    } catch (error) {
        console.error('Error initializing the database:', error);
    }
};

startBattleService();

import express from 'express';
import cors from 'cors';
import { battleRouter } from './routes/battleRoutes.js';

const app = express();
app.use(express.json());

const PORT = 5004;

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use('/battles', battleRouter);

export const startBattleService = () => {
    app.listen(PORT, () => {
        console.log(`Battle service is running on port ${PORT}`);
    });
};

startBattleService();

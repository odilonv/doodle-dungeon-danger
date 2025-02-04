import express from 'express';
import cors from 'cors';
import { heroRouter } from './routes/heroRoutes.js';

const app = express();
app.use(express.json());

const PORT = 5002;

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use('/heroes', heroRouter); 

export const startHeroService = () => {
    app.listen(PORT, () => {
        console.log(`Hero service is running on port ${PORT}`);
    });
};

startHeroService();

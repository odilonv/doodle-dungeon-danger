import express from 'express';
import cors from 'cors';
import { startUsersService } from './index.js';

const app = express();
const PORT = 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

startUsersService();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

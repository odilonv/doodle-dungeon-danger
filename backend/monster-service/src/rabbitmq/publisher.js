import amqp from 'amqplib';
import { MonsterService } from '../services/monsterService.js';

const RABBITMQ_URL = 'amqp://admin:admin@localhost:5672';
const MONSTER_POWER_QUEUE = 'monster_power_queue';
const MONSTER_XP_QUEUE = 'monster_xp_queue';

export const publishMonsterPower = async (monsterInstanceId) => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(MONSTER_POWER_QUEUE, { durable: true });
        const monsterInstance = await MonsterService.getMonsterInstanceById(monsterInstanceId);
        if (!monsterInstance) {
            console.error(`Monster instance ${monsterInstanceId} not found`);
            return;
        }
        const monster = await MonsterService.getMonsterById(monsterInstance.monsterId);

        const power = monster.power;
        const message = JSON.stringify({ monsterInstanceId, power });
        channel.sendToQueue(MONSTER_POWER_QUEUE, Buffer.from(message), { persistent: true });

        console.log(`Published power ${power} for monster ${monsterInstanceId}`);
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error publishing monster power:', error);
    }
};

export const publishMonsterXP = async (monsterInstanceId) => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(MONSTER_XP_QUEUE, { durable: true });

        const monsterInstance = await MonsterService.getMonsterInstanceById(monsterInstanceId);
        if (!monsterInstance) {
            console.error(`Monster instance ${monsterInstanceId} not found`);
            return;
        }
        const monster = await MonsterService.getMonsterById(monsterInstance.monsterId);

        const experience = monster.experience;
        const message = JSON.stringify({ monsterInstanceId, experience });

        channel.sendToQueue(MONSTER_XP_QUEUE, Buffer.from(message), { persistent: true });

        console.log(`Published XP ${experience} for monster ${monsterInstanceId}`);

        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error publishing monster XP:', error);
    }
};
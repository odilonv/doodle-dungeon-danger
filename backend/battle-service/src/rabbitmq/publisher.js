import amqp from 'amqplib';

const RABBITMQ_URL = 'amqp://admin:admin@localhost:5672';
const HERO_DAMAGE_QUEUE = 'hero_damage_queue';
const HERO_TAKEN_DAMAGE_QUEUE = 'hero_taken_damage_queue';
const HERO_XP_QUEUE = 'hero_xp_queue';

export const sendHeroDamage = async (monsterInstanceId, damage) => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(HERO_DAMAGE_QUEUE, { durable: true });

        const message = JSON.stringify({ monsterInstanceId, damage });
        console.log('Sending hero damage:', message);
        channel.sendToQueue(HERO_DAMAGE_QUEUE, Buffer.from(message), { persistent: true });

        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error('Error sending hero damage:', error);
    }
};

export const sendMonsterDamage = async (heroId, damage) => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(HERO_TAKEN_DAMAGE_QUEUE, { durable: true });

        const message = JSON.stringify({ heroId, damage });
        console.log(`Sending damage ${damage} to hero ${heroId}`);
        channel.sendToQueue(HERO_TAKEN_DAMAGE_QUEUE, Buffer.from(message), { persistent: true });

        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error('Error sending hero damage taken:', error);
    }
};

export const sendMontserXP = async (heroId, experience) => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(HERO_XP_QUEUE, { durable: true });

        const message = JSON.stringify({ heroId, experience });
        console.log(`Sending XP ${experience} to hero ${heroId}`);
        channel.sendToQueue(HERO_XP_QUEUE, Buffer.from(message), { persistent: true });

        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error('Error sending hero XP:', error);
    }
};

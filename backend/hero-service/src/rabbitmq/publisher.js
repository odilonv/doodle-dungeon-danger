import amqp from 'amqplib';

const RABBITMQ_URL = 'amqp://admin:admin@localhost:5672';
const QUEUE_NAME = 'hero_dungeon_progress';

export const sendHeroProgression = async (userId, dungeonId) => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(QUEUE_NAME, { durable: true });

        const message = JSON.stringify({ userId, dungeonId });
        channel.sendToQueue(QUEUE_NAME, Buffer.from(message), { persistent: true });
        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error(' Error sending hero progression:', error);
    }
};
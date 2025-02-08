import amqp from 'amqplib';
import { DungeonService } from '../services/dungeonService.js';
import { DungeonInstance } from '../models/dungeonModel.js';

const RABBITMQ_URL = 'amqp://admin:admin@localhost:5672';
const QUEUE_NAME = 'hero_dungeon_progress';

const consumeHeroProgression = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(QUEUE_NAME, { durable: true });

        console.log(` Waiting for hero dungeon progress messages...`);

        channel.consume(QUEUE_NAME, async (message) => {
            if (message !== null) {
                const { userId, dungeonId } = JSON.parse(message.content.toString());
                DungeonService.createDungeonInstance(userId, dungeonId);
                
                channel.ack(message);
            }
        });
    } catch (error) {
        console.error(' Error consuming hero progression:', error);
    }
};

const clearQueue = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.purgeQueue(QUEUE_NAME);

        console.log(`Queue ${QUEUE_NAME} has been cleared`);

        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error clearing the queue:', error);
    }
};

export { consumeHeroProgression, clearQueue };

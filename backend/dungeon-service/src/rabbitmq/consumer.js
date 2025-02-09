import amqp from 'amqplib';
import { DungeonService } from '../services/dungeonService.js';

const RABBITMQ_URL =  'amqp://admin:admin@localhost:5672';
const DUNGEON_PROGRESS_QUEUE = 'dungeon_progress_queue';

export const consumeHeroProgression = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(DUNGEON_PROGRESS_QUEUE, { durable: true });

        console.log(` Waiting for hero dungeon progress messages...`);

        channel.consume(DUNGEON_PROGRESS_QUEUE, async (message) => {
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
        await channel.purgeQueue(DUNGEON_PROGRESS_QUEUE);

        console.log(`Queue ${DUNGEON_PROGRESS_QUEUE} has been cleared`);

        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error clearing the queue:', error);
    }
};

export { clearQueue };

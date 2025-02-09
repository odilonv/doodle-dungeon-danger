import amqp from 'amqplib';

const RABBITMQ_URL =  'amqp://admin:admin@localhost:5672';
const USE_ITEM_QUEUE =  'use_item_queue';
const DUNGEON_PROGRESS_QUEUE = 'dungeon_progress_queue';
const DUNGEON_FINISHED_QUEUE = 'dungeon_finished_queue';
const HERO_DIED_QUEUE = 'hero_died_queue';

export const sendHeroProgression = async (userId, dungeonId) => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(DUNGEON_PROGRESS_QUEUE, { durable: true });

        const message = JSON.stringify({ userId, dungeonId });
        console.log(` Sending hero progression message to queue: ${message}`);
        channel.sendToQueue(DUNGEON_PROGRESS_QUEUE, Buffer.from(message), { persistent: true });
        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error(' Error sending hero progression:', error);
    }
};

export const sendHeroFinishedDungeon = async (userId, dungeonId) => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(DUNGEON_FINISHED_QUEUE, { durable: true });

        const message = JSON.stringify({ userId, dungeonId });
        channel.sendToQueue(DUNGEON_FINISHED_QUEUE, Buffer.from(message), { persistent: true });
        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error(' Error sending hero finished dungeon:', error);
    }
}


export const sendItemInfo = async (heroId, damage) => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(USE_ITEM_QUEUE, { durable: true });

        const message = JSON.stringify({ heroId, damage });
        channel.sendToQueue(USE_ITEM_QUEUE, Buffer.from(message), { persistent: true });
        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error(' Error using item:', error);
    }
};

export const sendHeroDied = async (heroId) => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(HERO_DIED_QUEUE, { durable: true });

        const message = JSON.stringify({ heroId });
        channel.sendToQueue(HERO_DIED_QUEUE, Buffer.from(message), { persistent: true });
        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error(' Error sending hero died:', error);
    }
}
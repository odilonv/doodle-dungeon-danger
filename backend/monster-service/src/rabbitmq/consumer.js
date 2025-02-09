import amqp from 'amqplib';
import { MonsterService } from '../services/monsterService.js';
import { publishMonsterPower, publishMonsterXP } from './publisher.js';

const RABBITMQ_URL =  'amqp://admin:admin@localhost:5672';
const HERO_DAMAGE_QUEUE =  'hero_damage_queue';

export const consumeHeroDamage = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(HERO_DAMAGE_QUEUE, { durable: true });

        channel.consume(HERO_DAMAGE_QUEUE, async (msg) => {
            if (msg !== null) {
                const { monsterInstanceId, damage } = JSON.parse(msg.content.toString());
                console.log(`Received damage ${damage} for monster ${monsterInstanceId}`);
                try {
                    if(!await MonsterService.getMonsterInstanceById(monsterInstanceId)) {
                        console.error(`Monster instance ${monsterInstanceId} not found`);
                        channel.ack(msg);
                        return;
                    }
                    const damagedMonsterInstance = await MonsterService.takeDamage(monsterInstanceId, damage);
                    if(damagedMonsterInstance.currentHealth === 0) {
                        publishMonsterXP(monsterInstanceId);
                    }
                    else{
                        publishMonsterPower(monsterInstanceId);
                    }

                    channel.ack(msg);
                } catch (error) {
                    console.error(`Error processing damage for monster ${monsterId}:`, error);
                    channel.nack(msg, false, true);
                }
            }
        });
    } catch (error) {
        console.error('Error setting up hero damage consumer:', error);
    }
};


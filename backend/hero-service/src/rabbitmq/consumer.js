import amqp from 'amqplib';
import { HeroService } from '../services/heroService.js';

const RABBITMQ_URL = 'amqp://admin:admin@localhost:5672';
const HERO_TAKEN_DAMAGE_QUEUE = 'hero_taken_damage_queue';
const HERO_XP_QUEUE = 'hero_xp_queue';

export const consumeHeroDamageTaken = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        
        await channel.assertQueue(HERO_TAKEN_DAMAGE_QUEUE, { durable: true });

        channel.consume(HERO_TAKEN_DAMAGE_QUEUE, async (msg) => {
            if (msg !== null) {
                try {
                    const { heroId, damage } = JSON.parse(msg.content.toString());
                    console.log(`Hero ${heroId} takes ${damage} damage`);

                    const hero = await HeroService.getHeroById(heroId);
                    if (!hero) {
                        console.error(`Hero ${heroId} not found`);
                        channel.ack(msg);
                        return;
                    }

                    await HeroService.takeDamage(heroId, damage);
                    if(hero.currentHealth == 0) {
                        console.log(`Hero ${heroId} has died`);

                    }
                    channel.ack(msg);
                } catch (error) {
                    console.error("Error processing hero damage:", error);
                    channel.nack(msg, false, false);
                }
            }
        });
    } catch (error) {
        console.error('Error in Hero Damage Taken consumer:', error);
    }
};

export const consumeMonsterXP = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        
        await channel.assertQueue(HERO_XP_QUEUE, { durable: true });

        channel.consume(HERO_XP_QUEUE, async (msg) => {
            if (msg !== null) {
                try {
                    const { heroId, experience } = JSON.parse(msg.content.toString());
                    console.log(`Hero ${heroId} gains ${experience} XP`);

                    const hero = await HeroService.getHeroById(heroId);
                    if (!hero) {
                        console.error(`Hero ${heroId} not found`);
                        channel.ack(msg);
                        return;
                    }

                    await HeroService.gainExperience(heroId, experience);
                    channel.ack(msg);
                } catch (error) {
                    console.error("Error processing hero XP:", error);
                    channel.nack(msg, false, false);
                }
            }
        });
    } catch (error) {
        console.error('Error in Hero XP consumer:', error);
    }
};

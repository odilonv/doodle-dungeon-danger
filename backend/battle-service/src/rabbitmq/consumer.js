import amqp from 'amqplib';
import { BattleService } from '../services/battleService.js';
import { sendHeroDamage, sendMonsterDamage, sendMontserXP } from './publisher.js';
import BattleRepository from '../repositories/battleRepository.js';
import Battle from '../models/battleModel.js';

const RABBITMQ_URL = 'amqp://admin:admin@localhost:5672';
const USE_ITEM_QUEUE = 'use_item_queue';
const DAMAGE_MONSTER_QUEUE = 'damage_monster_queue';
const MONSTER_POWER_QUEUE = 'monster_power_queue';
const MONSTER_XP_QUEUE = 'monster_xp_queue';
const HERO_DIED_QUEUE = 'hero_died_queue';

export const consumeItemInfo = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        
        await channel.assertQueue(USE_ITEM_QUEUE, { durable: true });

        channel.consume(USE_ITEM_QUEUE, async (msg) => {
            if (msg !== null) {
                try {
                    const { heroId, itemId, damage } = JSON.parse(msg.content.toString());
                    const battle = await BattleService.getCurrentBattleByHeroId(heroId);
                    if (!battle) {
                        console.error(`Battle not found for hero ${heroId}`);
                        channel.ack(msg);
                        return;
                    }
                    await sendHeroDamage(battle.monsterInstanceId, damage);
                    channel.ack(msg);
                } catch (error) {
                    console.error("Error processing item usage:", error);
                    channel.nack(msg, false, false); // Rejeter le message
                }
            }
        });
    } catch (error) {
        console.error('Error in RabbitMQ consumer:', error);
    }
};

export const consumeMonsterPower = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(MONSTER_POWER_QUEUE, { durable: true });

        channel.consume(MONSTER_POWER_QUEUE, async (msg) => {
            if (msg !== null) {
                try {
                    const { monsterInstanceId, power } = JSON.parse(msg.content.toString());
                    console.log(`Monster ${monsterInstanceId} attacks: ${power}`);
                    const battle = await BattleService.getBattleByMonsterInstanceId(monsterInstanceId);
                    if (!battle) {
                        console.error(`Battle not found for monster ${monsterInstanceId}`);
                        channel.ack(msg);
                        return;
                    }
                    sendMonsterDamage(battle.heroId, power);
                    channel.ack(msg);
                } catch (error) {
                    console.error("Error processing monster power:", error);
                    channel.nack(msg, false, false);
                }
            }
        });
    } catch (error) {
        console.error('Error in Monster Power consumer:', error);
    }
};

export const consumeMonsterXP = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(MONSTER_XP_QUEUE, { durable: true });

        channel.consume(MONSTER_XP_QUEUE, async (msg) => {
            if (msg !== null) {
                try {
                    const { monsterInstanceId, experience } = JSON.parse(msg.content.toString());
                    const battle = await BattleService.getBattleByMonsterInstanceId(monsterInstanceId);
                    sendMontserXP(battle.heroId, experience);
                    console.log(`Monster ${monsterInstanceId} gave XP: ${experience}`);
                    BattleService.updateBattleStatus(battle.id, Battle.BattleResult.VICTORY);

                    channel.ack(msg);
                } catch (error) {
                    console.error("Error processing monster XP:", error);
                    channel.nack(msg, false, false);
                }
            }
        });
    } catch (error) {
        console.error('Error in Monster XP consumer:', error);
    }
};

export const consumeHeroDied = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(HERO_DIED_QUEUE, { durable: true });

        channel.consume(HERO_DIED_QUEUE, async (msg) => {
            if (msg !== null) {
                try {
                    const { heroId } = JSON.parse(msg.content.toString());
                    console.log(`Hero ${heroId} died`);
                    const battle = await BattleService.getBattleByHeroId(heroId);
                    if (!battle) {
                        console.error(`Battle not found for hero ${heroId}`);
                        channel.ack(msg);
                        return;
                    }
                    console.log(`Battle over`);
                    BattleService.updateBattleStatus(battle.id, Battle.BattleResult.DEFEAT);
                    channel.ack(msg);
                } catch (error) {
                    console.error("Error processing hero death:", error);
                    channel.nack(msg, false, false);
                }
            }
        });
    } catch (error) {
        console.error('Error in Hero Death consumer:', error);
    }
}

class Monster {
    static tableName = 'Monster';

    constructor(id, name, health, power, experience) {
        this.id = id;
        this.name = name;
        this.health = health;
        this.power = power;
        this.experience = experience;
    }

    static fromDatabase(data) {
        return new Monster(
            data.id,
            data.name,
            data.health,
            data.power,
            data.experience
        );
    }

    static fromJson(data) {
        return new Monster(
            data.id,
            data.name,
            data.health,
            data.power,
            data.experience
        );
    }
}

class MonsterInstance {
    static tableName = 'Monster_Instance';

    constructor(monsterInstanceId, monsterId, dungeonInstanceId, position, currentHealth) {
        this.monsterInstanceId = monsterInstanceId;
        this.monsterId = monsterId;
        this.dungeonInstanceId = dungeonInstanceId;
        this.position = position;
        this.currentHealth = currentHealth;
    }

    static fromDatabase(data) {
        return new MonsterInstance(
            data.monsterInstanceId,
            data.monster_id,
            data.dungeon_instance_id,
            data.position,
            data.current_health
        );
    }

    static fromJson(data) {
        return new MonsterInstance(
            data.monsterInstanceId,
            data.monsterId,
            data.dungeonInstanceId,
            data.position,
            data.currentHealth
        );
    }
}

export { Monster, MonsterInstance };

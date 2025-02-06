class Monster {
    static tableName = 'Monster';

    constructor(id, name, health, power) {
        this.id = id;
        this.name = name;
        this.health = health;
        this.power = power;
    }

    static fromDatabase(data) {
        return new Monster(
            data.id,
            data.name,
            data.health,
            data.power
        );
    }

    static fromJson(data) {
        return new Monster(
            data.id,
            data.name,
            data.health,
            data.power
        );
    }
}

class MonsterInstance {
    static tableName = 'Monster_Instance';

    constructor(id, monsterId, dungeonInstanceId, position, currentHealth) {
        this.id = id;
        this.monsterId = monsterId;
        this.dungeonInstanceId = dungeonInstanceId;
        this.position = position;
        this.currentHealth = currentHealth;
    }

    static fromDatabase(data) {
        return new MonsterInstance(
            data.id,
            data.monster_id,
            data.dungeon_instance_id,
            data.position,
            data.current_health
        );
    }

    static fromJson(data) {
        return new MonsterInstance(
            data.id,
            data.monsterId,
            data.dungeonInstanceId,
            data.position,
            data.currentHealth
        );
    }
}

export { Monster, MonsterInstance };

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

    constructor(id, monsterId, dungeonInstanceId, position) {
        this.id = id;
        this.monsterId = monsterId;
        this.dungeonInstanceId = dungeonInstanceId;
        this.position = position;
    }

    static fromDatabase(data) {
        return new MonsterInstance(
            data.id,
            data.monster_id,
            data.dungeon_instance_id,
            JSON.parse(data.position)
        );
    }

    static fromJson(data) {
        return new MonsterInstance(
            data.id,
            data.monsterId,
            data.dungeonInstanceId,
            data.position
        );
    }
}

export { Monster, MonsterInstance };

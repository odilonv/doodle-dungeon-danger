class Battle {
    static tableName = 'Battle';

    constructor(id, heroId, dungeonInstanceId, monsters, result) {
        this.id = id;
        this.heroId = heroId;
        this.dungeonInstanceId = dungeonInstanceId;
        this.monsters = monsters;
        this.result = result;
    }

    static fromDatabase(data) {
        return new Battle(
            data.id,
            data.hero_id,
            data.dungeon_instance_id,
            JSON.parse(data.monsters),
            data.result
        );
    }

    static fromJson(data) {
        return new Battle(
            data.id,
            data.heroId,
            data.dungeonInstanceId,
            data.monsters,
            data.result
        );
    }
}

export default Battle;
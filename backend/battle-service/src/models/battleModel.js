class Battle {
    static tableName = 'Battle';

    static BattleResult = Object.freeze({
        VICTORY: 'Victory',
        DEFEAT: 'Defeat',
        ONGOING: 'Ongoing'
    });

    constructor(id, heroId, dungeonInstanceId, monsterInstanceId, result) {
        this.id = id;
        this.heroId = heroId;
        this.dungeonInstanceId = dungeonInstanceId;
        this.monsterInstanceId = monsterInstanceId;
        this.result = result;
    }

    static fromDatabase(data) {
        return new Battle(
            data.id,
            data.hero_id,
            data.dungeon_instance_id,
            data.monsterInstanceId,
            data.result
        );
    }

    static fromJson(data) {
        return new Battle(
            data.id,
            data.heroId,
            data.dungeonInstanceId,
            data.monsterInstanceId,
            data.result
        );
    }
}

export default Battle;
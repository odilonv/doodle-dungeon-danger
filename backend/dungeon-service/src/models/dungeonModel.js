class Dungeon {
    static tableName = 'Dungeon';

    constructor(id, name, map) {
        this.id = id;
        this.name = name;
        this.map = map;
    }

    static fromDatabase(data) {
        return new Dungeon(
            data.id,
            data.name,
            JSON.parse(data.map)
        );
    }

    static fromJson(data) {
        return new Dungeon(
            data.id,
            data.name,
            data.map
        );
    }
}

class DungeonInstance {
    static tableName = 'Dungeon_Instance';

    constructor(id, dungeonId, heroId, ennemies, treasures, status) {
        this.id = id;
        this.dungeonId = dungeonId;
        this.heroId = heroId;
        this.ennemies = ennemies;
        this.treasures = treasures;
        this.status = status;
    }

    static fromDatabase(data) {
        return new DungeonInstance(
            data.id,
            data.dungeon_id,
            data.hero_id,
            JSON.parse(data.ennemies),
            JSON.parse(data.treasures),
            data.status
        );
    }

    static fromJson(data) {
        return new DungeonInstance(
            data.id,
            data.dungeonId,
            data.heroId,
            data.ennemies,
            data.treasures,
            data.status
        );
    }
}

export { Dungeon, DungeonInstance };

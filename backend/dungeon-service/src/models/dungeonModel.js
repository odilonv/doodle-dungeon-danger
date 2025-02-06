class Dungeon {
    static tableName = 'Dungeon';
    static instanceTableName = 'Dungeon_Instance';

    constructor(id, name, map, monsters) {
        this.id = id;
        this.name = name;
        this.map = map;
        this.monsters = monsters;
        this.dimensions = {
            width: map[0].length,
            height: map.length
        };
    }

    static fromDatabase(data) {
        console.log(data);
        return new Dungeon(
            data.id,
            data.name,
            data.map,
            data.monsters
        );
    }

    static fromJson(data) {
        return new Dungeon(
            data.id,
            data.name,
            data.map,
            data.monsters
        );
    }
}

class DungeonInstance {
    static tableName = 'Dungeon_Instance';

    constructor(id, dungeonId, status) {
        this.id = id;
        this.dungeonId = dungeonId;
        this.status = status;
    }

    static fromDatabase(data) {
        return new DungeonInstance(
            data.id,
            data.dungeon_id,
            data.status
        );
    }

    static fromJson(data) {
        return new DungeonInstance(
            data.id,
            data.dungeonId,
            data.status
        );
    }
}

export { Dungeon, DungeonInstance };

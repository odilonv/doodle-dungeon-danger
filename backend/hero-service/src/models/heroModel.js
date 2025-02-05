class Hero {
    static tableName = 'Hero';

    constructor(id, name, level, maxHealth, currentHealth, experience, currentDungeon, position) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.maxHealth = maxHealth;
        this.currentHealth = currentHealth;
        this.experience = experience;
        this.currentDungeon = currentDungeon;
        this.position = position;
    }

    static fromDatabase(data) {
        return new Hero(
            data.id,
            data.name,
            data.level,
            data.max_health,
            data.current_health,
            data.experience,
            data.current_dungeon,
            data.position
        );
    }

    static fromJson(data) {
        return new Hero(
            data.id,
            data.name,
            data.level,
            data.maxHealth,
            data.currentHealth,
            data.experience,
            data.currentDungeon,
            data.position
        );
    }
}

export default Hero;

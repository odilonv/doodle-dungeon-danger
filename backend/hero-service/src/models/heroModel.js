import HeroRepository from '../repositories/heroRepository.js';

class Hero {
    static tableName = 'Hero';

    constructor(id, name, level, maxHealth, currentHealth, experience, currentDungeon, position, avatar, userId, inventory = []) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.maxHealth = maxHealth;
        this.currentHealth = currentHealth;
        this.experience = experience;
        this.currentDungeon = currentDungeon;
        this.position = position;
        this.avatar = avatar;
        this.userId = userId;
        this.inventory = HeroRepository.getInventory(id)
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
            data.position,
            data.avatar,
            data.user_id,
            HeroRepository.getInventory(data.id)
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
            data.position,
            data.avatar,
            data.userId,
            data.inventory || []
        );
    }
}

class Item {
    static tableName = 'Item';

    constructor(id, name, minLevel, manaCost, healthCost, power, healthBonus, manaBonus) {
        this.id = id;
        this.name = name;
        this.minLevel = minLevel;
        this.manaCost = manaCost;
        this.healthCost = healthCost;
        this.power = power;
        this.healthBonus = healthBonus;
        this.manaBonus = manaBonus;
    }

    static fromDatabase(data) {
        return new Item(
            data.id,
            data.name,
            data.min_level,
            data.mana_cost,
            data.health_cost,
            data.power,
            data.health_bonus,
            data.mana_bonus
        );
    }

    static fromJson(data) {
        return new Item(
            data.id,
            data.name,
            data.minLevel,
            data.manaCost,
            data.healthCost,
            data.power,
            data.healthBonus,
            data.manaBonus
        );
    }
}

class Inventory {
    static tableName = 'Inventory';

    constructor(heroId, itemId) {
        this.heroId = heroId;
        this.itemId = itemId;
    }
}

export { Hero, Item, Inventory };

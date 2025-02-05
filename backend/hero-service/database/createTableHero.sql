CREATE TABLE Hero (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    level INT DEFAULT 1,
    max_health INT DEFAULT 100,
    current_health INT DEFAULT 100,
    experience INT DEFAULT 0,
    current_dungeon INT,
    position JSON
);

CREATE TABLE Item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    min_level INT DEFAULT 1,
    mana_cost INT DEFAULT 0,
    health_cost INT DEFAULT 0,
    power INT DEFAULT 10,
    health_bonus INT DEFAULT 0,
    mana_bonus INT DEFAULT 0
);

CREATE TABLE Inventory (
    hero_id INT,
    item_id INT,
    FOREIGN KEY (hero_id) REFERENCES Hero(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES Item(id) ON DELETE CASCADE
);
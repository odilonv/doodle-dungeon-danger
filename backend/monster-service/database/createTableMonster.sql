CREATE TABLE Monster (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    health INT DEFAULT 100,
    power INT DEFAULT 20,
    experience INT DEFAULT 10
);

CREATE TABLE Monster_Instance (
    monster_instance_id INT AUTO_INCREMENT PRIMARY KEY,
    monster_id INT,
    dungeon_instance_id INT,
    position JSON,
    current_health INT DEFAULT 100,
    FOREIGN KEY (monster_id) REFERENCES Monster(id) ON DELETE CASCADE
);
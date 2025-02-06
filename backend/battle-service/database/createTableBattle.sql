CREATE TABLE Battle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hero_id INT,
    dungeon_instance_id INT,
    monsterInstanceId INT,
    result ENUM('Victory', 'Defeat', 'Ongoing') DEFAULT 'Ongoing'
);
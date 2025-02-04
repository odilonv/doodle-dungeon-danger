CREATE TABLE Battle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hero_id INT,
    dungeon_instance_id INT,
    monsters JSON,
    result ENUM('Victoire', 'Défaite', 'En cours') DEFAULT 'En cours',
);
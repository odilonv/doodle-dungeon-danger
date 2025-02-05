CREATE TABLE Dungeon (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    map JSON NOT NULL,
    monsters JSON NOT NULL
);

CREATE TABLE Dungeon_Instance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dungeon_id INT,
    status ENUM('En cours', 'Terminé') DEFAULT 'En cours',
    FOREIGN KEY (dungeon_id) REFERENCES Dungeon(id) ON DELETE CASCADE
)
import React, { useState, useEffect } from 'react';
import { ModalBattleComponent } from '../';

const Map1Component = ({ hero, setHero, map, monsters }) => {
    const wall = "sprites/decoration/Wall.png";
    const widthSize = map.length;
    const heightSize = map[0].length;
    const [cellSize, setCellSize] = useState(window.innerWidth / widthSize);
    const [isInBattle, setIsInBattle] = useState(false);
    const [ennemy, setEnnemy] = useState(null);
    const [monsterPositions, setMonsterPositions] = useState([]);

    const handleOpen = () => setIsInBattle(true);
    const handleClose = () => setIsInBattle(false);

    useEffect(() => {
        const handleResize = () => {
            setCellSize(window.innerWidth / widthSize);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Placement aléatoire des monstres
        const availableCells = [];
        map.forEach((column, y) => {
            column.forEach((cell, x) => {
                if (cell === 0) availableCells.push({ y, x });
            });
        });

        let placedMonsters = [];
        monsters.forEach(monster => {
            for (let i = 0; i < monster.amount; i++) {
                if (availableCells.length === 0) break;
                const randomIndex = Math.floor(Math.random() * availableCells.length);
                const position = availableCells.splice(randomIndex, 1)[0];
                placedMonsters.push({ id: monster.id, position });
            }
        });
        setMonsterPositions(placedMonsters);
    }, [map, monsters]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (isInBattle) return;
            const position = hero.position;
            const newPosition = { x: position.x, y: position.y };

            switch (event.key) {
                case 'ArrowUp':
                    if (newPosition.y - 1 < 0 || map[newPosition.x][newPosition.y - 1] === 1) return;
                    newPosition.y -= 1;
                    break;
                case 'ArrowDown':
                    if (newPosition.y + 1 > heightSize - 1 || map[newPosition.x][newPosition.y + 1] === 1) return;
                    newPosition.y += 1;
                    break;
                case 'ArrowLeft':
                    if (newPosition.x - 1 < 0 || map[newPosition.x - 1][newPosition.y] === 1) return;
                    newPosition.x -= 1;
                    break;
                case 'ArrowRight':
                    if (newPosition.x + 1 > widthSize - 1 || map[newPosition.x + 1][newPosition.y] === 1) return;
                    newPosition.x += 1;
                    break;
                default:
                    return;
            }

            const encounteredMonster = monsterPositions.find(monster =>
                monster.position.y === newPosition.x && monster.position.x === newPosition.y
            );

            if (encounteredMonster) {
                setIsInBattle(true);
                setEnnemy({
                    name: `Monster ${encounteredMonster.id}`,
                    level: 1,
                    current_health: 100,
                    max_health: 200,
                    attack: 10,
                    defense: 5,
                    characterImage: `sprites/characters/Monster_${encounteredMonster.id}.png`
                });
            }

            setHero({ ...hero, position: newPosition });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [hero.position, map, isInBattle, monsterPositions]);

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${widthSize}, ${cellSize}px)`,
                gridTemplateRows: `repeat(${heightSize}, ${cellSize}px)`,
                position: 'relative',
            }}
        >
            {map.map((row, y) =>
                <div>
                    {row.map((cell, x) => (
                        <div
                            key={`${y}-${x}`}
                            style={{
                                width: cellSize,
                                height: cellSize,
                                backgroundImage: `url(sprites/decoration/Tile_${Math.floor(Math.random() * 3) + 1}.png)`,
                                backgroundSize: 'cover',
                                position: 'relative',
                            }}
                        >
                            {cell === 1 && (
                                <img src={wall} alt="Wall" style={{ position: 'absolute', width: '100%', height: '100%' }} />
                            )}
                        </div>
                    ))
                    }
                </div>
            )}

            {monsterPositions.map((monster, index) => (
                <img
                    key={index}
                    src={`sprites/characters/Monster_${monster.id}.png`}
                    alt={`Monster ${monster.id}`}
                    style={{
                        position: 'absolute',
                        width: `${cellSize - 30}px`,
                        top: monster.position.x * cellSize,
                        left: monster.position.y * cellSize,
                    }}
                />
            ))}
            <img
                src={hero.characterImage}
                alt="Player"
                style={{
                    position: 'absolute',
                    width: `${cellSize - 30}px`,
                    top: hero.position.y * cellSize,
                    left: hero.position.x * cellSize,
                    transition: 'top 0.1s, left 0.1s',
                }}
            />
            {isInBattle && <ModalBattleComponent isInBattle={isInBattle} handleClose={handleClose} hero={hero} ennemy={ennemy} />}
        </div>
    );
};

export default Map1Component;

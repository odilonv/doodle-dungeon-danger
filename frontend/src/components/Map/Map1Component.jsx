import React, { useState, useEffect } from 'react';
import { ModalBattleComponent } from '../';

import { move } from '../../services/API/ApiHero';

const Map1Component = ({ hero, setHero, map, monsters }) => {
    const wall = "sprites/decoration/Wall.png";
    const widthSize = map.length;
    const heightSize = map[0].length;
    const [cellSize, setCellSize] = useState(window.innerWidth / widthSize);
    const [isInBattle, setIsInBattle] = useState(false);
    const [ennemy, setEnnemy] = useState(null);

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

            const encounteredMonster = monsters.find(monster =>
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
            move(hero.id, newPosition);

        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [hero.position, map, isInBattle]);

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

            {console.log("Monsters", monsters)}


            {monsters.map((monster, index) => (
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
            <div
                alt="Player"
                style={{
                    position: 'absolute',
                    top: hero.position.y * cellSize,
                    left: hero.position.x * cellSize,
                    width: `${cellSize - 30}px`,
                    height: `${cellSize - 30}px`,
                    transition: 'top 0.1s, left 0.1s',
                }}
            >
                <img
                    src={hero.avatar.body}
                    alt="Base"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1,
                        width: '100%',
                        height: '100%',
                    }}
                />

                {hero.avatar.skin && (
                    <img
                        src={hero.avatar.skin}
                        alt="Skin"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 2,
                            width: '100%',
                            height: '100%',
                        }}
                    />
                )}

                {hero.avatar.face && (
                    <img
                        src={hero.avatar.face}
                        alt="Face"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 3,
                            width: '100%',
                            height: '100%',
                        }}
                    />
                )}

                {hero.avatar.accessory && (
                    <img
                        src={hero.avatar.accessory}
                        alt="Accessory"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 4,
                            width: '100%',
                            height: '100%',
                        }}
                    />
                )}
            </div>
            {
                isInBattle &&
                <ModalBattleComponent isInBattle={isInBattle} handleClose={handleClose} hero={hero} ennemy={ennemy} />
            }
        </div >
    );
};

export default Map1Component;

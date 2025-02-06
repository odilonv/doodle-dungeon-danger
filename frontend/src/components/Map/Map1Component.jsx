import React, { useState, useEffect } from 'react';


import { ModalBattleComponent } from '../';

const Map1Component = ({ hero, setHero }) => {

    const wall = "sprites/decoration/Wall.png";
    const ground = "sprites/decoration/ground.png";

    const widthSize = 10;
    const heightSize = 5;

    const [cellSize, setCellSize] = useState(window.innerWidth / widthSize);

    const [isInBattle, setIsInBattle] = React.useState(false);
    const [ennemy, setEnnemy] = React.useState(null);

    const handleOpen = () => setIsInBattle(true);
    const handleClose = () => setIsInBattle(false);

    useEffect(() => {
        const handleResize = () => {
            setCellSize(window.innerWidth / widthSize);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const generateMap = () => {
        return Array.from({ length: heightSize }, () =>
            Array.from({ length: widthSize }, () => (Math.random() < 0.2 ? 1 : Math.random() < 0.05 ? 2 : 0))
        );
    };

    const [map] = useState(generateMap);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (isInBattle) return;
            const position = hero.position;
            const newPosition = { x: position.x, y: position.y };

            switch (event.key) {
                case 'ArrowUp':
                    if (newPosition.y - 1 < 0 || map[newPosition.y - 1][newPosition.x] === 1) return;
                    newPosition.y = position.y - 1;
                    break;
                case 'ArrowDown':
                    if (newPosition.y + 1 > heightSize - 1 || map[newPosition.y + 1][newPosition.x] === 1) return;
                    newPosition.y = position.y + 1;
                    break;
                case 'ArrowLeft':
                    if (newPosition.x - 1 < 0 || map[newPosition.y][newPosition.x - 1] === 1) return;
                    newPosition.x = position.x - 1;
                    break;
                case 'ArrowRight':
                    if (newPosition.x + 1 > widthSize - 1 || map[newPosition.y][newPosition.x + 1] === 1) return;
                    newPosition.x = position.x + 1;
                    break;
                default:
                    return;
            }


            if (map[newPosition.y][newPosition.x] === 2) {
                setIsInBattle(true);
                setEnnemy({ name: 'DogMan', level: 1, current_health: 80, max_health: 1950, attack: 10, defense: 5, characterImage: 'sprites/characters/Monster_1.png' });
            }

            setHero({ ...hero, position: newPosition });
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
            {map.flat().map((cell, index) => (
                <div
                    key={index}
                    style={{
                        width: cellSize,
                        height: cellSize,
                        backgroundImage: `url(${ground})`,
                        backgroundSize: 'cover',
                        position: 'relative',
                    }}
                >
                    {cell === 1 ? (
                        <img
                            src={wall}
                            alt="Wall"
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    ) : cell === 2 ? (
                        <img
                            src='sprites/characters/Monster_1.png'
                            alt="DogMan"
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    ) : null}
                </div>
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
            {isInBattle &&
                <ModalBattleComponent isInBattle={isInBattle} handleClose={handleClose} hero={hero} ennemy={ennemy} />
            }
        </div>
    );
};

export default Map1Component;
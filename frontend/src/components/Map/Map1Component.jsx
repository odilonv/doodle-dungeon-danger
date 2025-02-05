import React, { useState, useEffect } from 'react';

import { Modal } from '@mui/material';

import grass from '../../assets/maps/grass.png';
import tree from '../../assets/maps/tree.png';
import player_2 from '../../assets/sprites/characters/Player_2.png';
import DogMan from '../../assets/sprites/characters/DogMan.png';

import { ModalBattleComponent } from '../';

const Map1Component = ({ hero , setHero }) => {
    const widthSize = 16;
    const heightSize = 9;

    const [cellSize, setCellSize] = useState(window.innerWidth / widthSize);

    const [isInBattle, setIsInBattle] = React.useState(false);
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
            }

            setHero({ ...hero, position: newPosition });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [hero.position, map]);

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
                        backgroundImage: `url(${grass})`,
                        backgroundSize: 'cover',
                        position: 'relative',
                    }}
                >
                    {cell === 1 ? (
                        <img
                            src={tree}
                            alt="Tree"
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    ) : cell === 2 ? (
                        <img
                            src={DogMan}
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
                src={player_2}
                alt="Player"
                style={{
                    position: 'absolute',
                    width: `${cellSize - 30}px`,
                    top: hero.position.y * cellSize,
                    left: hero.position.x * cellSize,
                    transition: 'top 0.1s, left 0.1s',
                }}
            />
            <ModalBattleComponent isInBattle={isInBattle} handleClose={handleClose} hero={hero} />
        </div>
    );
};

export default Map1Component;
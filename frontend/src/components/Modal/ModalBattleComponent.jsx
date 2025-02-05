import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '@mui/material';
import BattleLoaderComponent from '../Loaders/BattleLoaderComponent';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import styled from '@mui/material/styles/styled';

const ModalBattleComponent = ({ isInBattle, handleClose, hero, ennemy }) => {
    const [isTransitionning, setIsTransitionning] = useState(true);
    const [modalSize, setModalSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef(null);
    const boxSize = 49;

    useEffect(() => {
        const calculateModalSize = () => {
            const { innerWidth, innerHeight } = window;

            const minWidth = Math.floor(innerWidth * 0.85);
            const minHeight = Math.floor(innerHeight * 0.85);

            const adjustedWidth = Math.floor(minWidth / boxSize) * boxSize;
            const adjustedHeight = Math.floor(minHeight / boxSize) * boxSize;

            setModalSize({
                width: adjustedWidth,
                height: adjustedHeight,
            });
        };

        if (isInBattle) {
            calculateModalSize();
            window.addEventListener('resize', calculateModalSize);

            return () => {
                window.removeEventListener('resize', calculateModalSize);
            };
        }
    }, [isInBattle]);

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[200],
            ...theme.applyStyles('dark', {
                backgroundColor: theme.palette.grey[800],
            }),
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: 'green',
            ...theme.applyStyles('dark', {
                backgroundColor: '#308fe8',
            }),
        },
    }));

    return (
        <Modal
            open={isInBattle}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div
                ref={containerRef}
                style={{
                    backgroundColor: `${isTransitionning ? 'transparent' : 'white'}`,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: `${modalSize.width}px`,
                    height: `${modalSize.height}px`,
                    padding: `${isTransitionning ? '0' : '20px'}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflow: 'hidden',
                }}
            >
                {!isTransitionning ? (
                    <div battle-header style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div>
                            <img
                                src={`/life_bar/${Math.round((hero.current_health / hero.max_health) * 20) * 5}.png`}
                                alt="Life bar"
                                style={{
                                    width: '100px',
                                    height: '100px',
                                }}
                            />
                            <img
                                src={hero.characterImage}
                                alt="Player"
                                style={{
                                    width: '100px',
                                    height: '100px',
                                }}
                            />
                        </div>
                        <h2 id="simple-modal-title">Battle !</h2>
                        <div>
                            <img
                                src={`/life_bar/${Math.round((ennemy.current_health / ennemy.max_health) * 20) * 5}.png`}
                                alt="Life bar"
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    transform: 'rotateY(180deg)',
                                }}
                            />
                            <img
                                src={ennemy.characterImage}
                                alt="Ennemy"
                                style={{
                                    width: '100px',
                                    height: '100px',
                                }}
                            />
                        </div>
                    </div>

                ) : (
                    <BattleLoaderComponent isTransitionning={isTransitionning} setIsTransitionning={setIsTransitionning} containerRef={containerRef} />
                )}
            </div>
        </Modal>
    );
};

export default ModalBattleComponent;

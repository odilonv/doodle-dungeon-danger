import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '@mui/material';
import BattleLoaderComponent from '../Loaders/BattleLoaderComponent';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import styled from '@mui/material/styles/styled';

const attackAnimationDuration = 300;
const characterSize = 300;
const boxSize = 49;

const modalContainerStyle = (isTransitionning, modalSize) => ({
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
});

const characterStyle = (isAttacking) => ({
    width: `${characterSize}px`,
    height: `${characterSize}px`,
    transition: `transform ${attackAnimationDuration}ms ease-in-out`,
    transform: isAttacking ? 'rotate(20deg)' : 'rotate(0deg)',
});

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    width: '45%',
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[200],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: 'green',
    },
}));

const ModalBattleComponent = ({ isInBattle, handleClose, hero, ennemy }) => {
    const [isTransitionning, setIsTransitionning] = useState(true);
    const [modalSize, setModalSize] = useState({ width: 0, height: 0 });
    const [heroAttacking, setHeroAttacking] = useState(false);
    const [ennemyAttacking, setEnnemyAttacking] = useState(false);
    const [dialogue, setDialogue] = useState('');
    const containerRef = useRef(null);

    useEffect(() => {
        const calculateModalSize = () => {
            const { innerWidth, innerHeight } = window;
            const minWidth = Math.floor(innerWidth * 0.85);
            const minHeight = Math.floor(innerHeight * 0.85);
            const adjustedWidth = Math.floor(minWidth / boxSize) * boxSize;
            const adjustedHeight = Math.floor(minHeight / boxSize) * boxSize;

            setModalSize({ width: adjustedWidth, height: adjustedHeight });
        };

        if (isInBattle) {
            calculateModalSize();
            window.addEventListener('resize', calculateModalSize);
            return () => window.removeEventListener('resize', calculateModalSize);
        }
    }, [isInBattle]);

    const handleAttack = (weapon) => {
        setHeroAttacking(true);
        setDialogue(`Le héros attaque avec ${weapon} !`);
        setTimeout(() => setHeroAttacking(false), attackAnimationDuration);
    };

    return (
        <Modal open={isInBattle} onClose={handleClose}>
            <div ref={containerRef} style={modalContainerStyle(isTransitionning, modalSize)}>
                {!isTransitionning ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                            <BorderLinearProgress variant="determinate" value={hero.health} />
                            <BorderLinearProgress variant="determinate" value={ennemy.health} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '80%' }}>
                            <img src={hero.characterImage} alt="Player" style={characterStyle(heroAttacking)} />
                            <div style={{ width: '200px', padding: '10px', background: 'white', border: '2px solid black', borderRadius: '10px', textAlign: 'center' }}>{dialogue}</div>
                            <img src={ennemy.characterImage} alt="Ennemy" style={characterStyle(ennemyAttacking)} />
                        </div>

                        {/* Attack Options */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', width: '80%' }}>
                            {['Épée', 'Arc', 'Lance'].map((weapon) => (
                                <button
                                    key={weapon}
                                    onClick={() => handleAttack(weapon)}
                                    style={{ width: '80px', height: '80px', borderRadius: '10px', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    🗡️
                                </button>
                            ))}
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

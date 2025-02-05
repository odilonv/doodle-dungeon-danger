import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '@mui/material';
import BattleLoaderComponent from '../Loaders/BattleLoaderComponent';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import styled from '@mui/material/styles/styled';
import CloseIcon from '@mui/icons-material/CloseRounded';

const attackAnimationDuration = 300;
const characterSize = 300;
const boxSize = 49;

const modalContainerStyle = (isTransitionning, modalSize) => ({
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: `${modalSize.width}px`,
  height: `${modalSize.height}px`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'hidden',
  position: 'relative',
  backgroundImage: 'url("sprites/rectangles/Rectangle_2.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  boxSizing: 'border-box',
  padding: '50px 100px',
});


const characterStyle = (isAttacking, isHero = true) => ({
  width: `${characterSize}px`,
  height: `${characterSize}px`,
  transition: `transform ${attackAnimationDuration}ms ease-in-out, translateX ${attackAnimationDuration}ms ease-in-out`,
  transform: isAttacking && isHero ? 'translateX(300px)' : isAttacking && !isHero ? 'translateX(-300px)' : 'translateX(0)',
});

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
      const minWidth = Math.floor(innerWidth * 0.90);
      const minHeight = Math.floor(innerHeight * 0.90);
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

  const [currentCharacterImage, setCurrentCharacterImage] = useState(hero.characterImage.replace('.png', ''));

  useEffect(() => {
    if (hero.current_health / hero.max_health <= 0.1) {
      setCurrentCharacterImage(currentCharacterImage + '_dead.png');
    } else {
      setCurrentCharacterImage(currentCharacterImage + '.png');
    }
  }, [hero.current_health]);

  const [currentEnnemyImage, setCurrentEnnemyImage] = useState(ennemy.characterImage.replace('.png', ''));

  useEffect(() => {
    if (ennemy.current_health / ennemy.max_health <= 0.1) {
      setCurrentEnnemyImage(currentEnnemyImage + '_dead.png');
    } else {
      setCurrentEnnemyImage(currentEnnemyImage + '.png');
    }
  }, [ennemy.current_health]);

  return (
    <Modal open={isInBattle} onClose={handleClose} disableAutoFocus disableEnforceFocus>
      <div ref={containerRef} style={modalContainerStyle(isTransitionning, modalSize)}>
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '50px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '30px',
            color: 'black',
          }}
        >
          <CloseIcon />
        </button>

        {!false ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
              <img
                src={`/sprites/life_bar/${Math.round((hero.current_health / hero.max_health) * 20) * 5}.png`}
                alt="Life bar"
                style={{
                  height: '50px',
                }}
              />
              <img
                src={`/sprites/life_bar/${Math.round((ennemy.current_health / ennemy.max_health) * 20) * 5}.png`}
                alt="Life bar"
                style={{
                  height: '50px',
                  transform: 'rotateY(180deg)',
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
              <img src={currentCharacterImage}
                alt="Player" style={characterStyle(heroAttacking)} />
              <img src={currentEnnemyImage}
                alt="Ennemy" style={characterStyle(ennemyAttacking)} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '150px', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '10px', height: '100%', width: '100%' }}>
                {['Hoe', 'Gun', 'Sword'].map((weapon, index) => (
                  <button
                    key={weapon}
                    onClick={() => handleAttack(weapon)}
                    style={{
                      width: '20%', height: '100%', position: 'relative', overflow: 'hidden', background: 'none',
                      border: 'none',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img src={`sprites/squares/Square_${index + 1}.png`} alt={weapon} style={{ width: '100%', height: '100%', cursor: 'pointer' }} />
                    <img src={`sprites/weapons/Item_${index + 1}.png`} alt={weapon} style={{ width: '80%', height: '80%', position: 'absolute', cursor: 'pointer' }} />
                  </button>
                ))}
              </div>
              <div style={{ width: '45%', height: '100%', position: 'relative' }}>
                <img src={`sprites/rectangles/Rectangle_1.png`} alt='dialogue-box' style={{ width: '100%', height: '100%' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', boxSizing: 'border-box' }}>
                  {dialogue}
                </div>
              </div>
            </div>
          </div>
        ) :
          (
            <BattleLoaderComponent isTransitionning={isTransitionning} setIsTransitionning={setIsTransitionning} containerRef={containerRef} />
          )
        }
      </div>
    </Modal>
  );
};

export default ModalBattleComponent;

import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { battleUseItem, getHeroById } from '../../services/API/ApiHero';
import { startBattle, getCurrentBattleByHeroId } from '../../services/API/ApiBattle.js';
import { getMonsterInstanceById } from '../../services/API/ApiMonsters.js';

const attackAnimationDuration = 300;
const characterSize = 300;
const boxSize = 49;

const characterStyle = (isAttacking, isHero = true) => ({
  width: `${characterSize}px`,
  height: `${characterSize}px`,
  transition: `transform ${attackAnimationDuration}ms ease-in-out`,
  transform: isAttacking && isHero ? 'translateX(320px)' : isAttacking && !isHero ? 'translateX(-320px)' : 'translateX(0)',
});

const buttonStyle = {
  position: 'absolute',
  top: '10px',
  right: '50px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '30px',
  color: 'black',
};

const lifeBarStyle = {
  height: '50px',
};

const actionsContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  height: '150px',
  alignItems: 'center',
};

const weaponsContainerStyle = {
  display: 'flex',
  gap: '10px',
  height: '100%',
  width: '100%',
};

const dialogueContainerStyle = {
  width: '45%',
  height: '100%',
  position: 'relative',
};

const dialogueBoxStyle = {
  width: '100%',
  height: '100%',
};

const dialogueTextStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  boxSizing: 'border-box',
  fontSize: '1.5rem',
  fontWeight: 'bold',
};

const weaponButtonStyle = {
  width: '20%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  background: 'none',
  border: 'none',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const preloadImages = (imagePaths) => {
  imagePaths.forEach((path) => {
    const img = new Image();
    img.src = path;
  });
};

const ModalBattleComponent = ({ isInBattle, handleClose, hero, ennemy }) => {
  const [isTransitionning, setIsTransitionning] = useState(true);
  const [transitionningState, setTransitionningState] = useState(0);

  const modalContainerStyle = (isTransitionning, modalSize) => ({
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: `${modalSize.width}px`,
    height: `${modalSize.height}px`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    backgroundImage: `url("sprites/rectangles/BigRectangle${isTransitionning ? '_' + transitionningState : ''}.png")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    boxSizing: 'border-box',
    padding: '50px 90px 50px 80px',
  });

  useEffect(() => {
    const fetchData = async () => {
        const transitionImages = Array.from({ length: 11 }, (_, i) => `sprites/rectangles/BigRectangle_${i * 10}.png`);
        preloadImages(transitionImages);

        if (isTransitionning) {
          updateHeroAndEnnemy();
            if(!await getCurrentBattleByHeroId(hero.id)) {
              console.log(ennemy)
              await startBattle(hero.id, ennemy.monster_instance_id, hero.currentDungeon);
            }
        }
    };

    fetchData();

    const interval = setInterval(() => {
        setTransitionningState((prevState) => {
            if (prevState >= 100) {
                clearInterval(interval);
                setIsTransitionning(false);
                return 100;
            }
            return prevState + 10;
        });
    }, 50);

    return () => clearInterval(interval); 

}, [isTransitionning]);


  const [modalSize, setModalSize] = useState({ width: 0, height: 0 });
  const [heroAttacking, setHeroAttacking] = useState(false);
  const [ennemyAttacking, setEnnemyAttacking] = useState(false);
  const [dialogue, setDialogue] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    const calculateModalSize = () => {
      const { innerWidth, innerHeight } = window;
      const minWidth = Math.floor(innerWidth * 0.9);
      const minHeight = Math.floor(innerHeight * 0.9);
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

  const updateHeroAndEnnemy = async () => {
    try {
      const updatedHero = await getHeroById(hero.id);
      const updatedEnnemy = await getMonsterInstanceById(ennemy.monster_instance_id);
      hero.currentHealth = updatedHero.currentHealth;
      ennemy.current_health = updatedEnnemy.currentHealth;
    } catch (error) {
      console.error('Error updating hero and ennemy:', error);
    }
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const handleAttack = async (item) => {
    setHeroAttacking(true);
    battleUseItem(hero.id, item.item_id);

    setDialogue(`The hero attacks with ${item.name}!`);

    if (item.health_cost) {
        await delay(1000);
        setDialogue(`You hurt yourself!`);
        return;
    }

    await delay(attackAnimationDuration);
    setHeroAttacking(false);
    await delay(500);
    await updateHeroAndEnnemy();

    if (hero.currentHealth <= 0) {
        setDialogue('You lost the battle! GAME OVER');
        await delay(2000);
        handleClose();
    } else if (ennemy.current_health <= 0) {
        setDialogue(`You won the battle! Experience points earned: ${ennemy.experience}`);
        await delay(2000);
        handleClose();
    } else {
        setDialogue('Enemy attacks!');
        setEnnemyAttacking(true);
        await delay(attackAnimationDuration);
        setEnnemyAttacking(false);
    }
};


  const [currentCharacterImage, setCurrentCharacterImage] = useState(hero.avatar.body.replace('.png', ''));

  useEffect(() => {
    if (hero.current_health / hero.max_health <= 0.1) {
      setCurrentCharacterImage(hero.avatar.body.replace('.png', '_dead.png'));
    } else {
      setCurrentCharacterImage(hero.avatar.body);
    }
  }, [hero.current_health]);

  const [currentEnnemyImage, setCurrentEnnemyImage] = useState(ennemy.characterImage.replace('.png', ''));

  useEffect(() => {
    if (ennemy.current_health / ennemy.max_health <= 0.1) {
      setCurrentEnnemyImage(ennemy.characterImage.replace('.png', '_dead.png'));
    } else {
      setCurrentEnnemyImage(ennemy.characterImage);
    }
  }, [ennemy.current_health, ennemy.characterImage]);

  return (
    <Modal open={isInBattle} onClose={null} disableAutoFocus disableEnforceFocus>
      <div ref={containerRef} style={modalContainerStyle(isTransitionning, modalSize)}>
        {!isTransitionning && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
              <img
                src={`/sprites/life_bar/${Math.round((hero.currentHealth / hero.maxHealth) * 20) * 5}.png`}
                alt="Life bar"
                style={lifeBarStyle}
              />
              <img
                src={`/sprites/life_bar/${Math.round((ennemy.current_health / ennemy.health) * 20) * 5}.png`}
                alt="Life bar"
                style={{ ...lifeBarStyle, transform: 'rotateY(180deg)' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
              <img src={currentCharacterImage} alt="Player" style={characterStyle(heroAttacking)} />
              <img src={currentEnnemyImage} alt="Ennemy" style={characterStyle(ennemyAttacking, false)} />
            </div>

            <div style={actionsContainerStyle}>
              <div style={weaponsContainerStyle}>
                  {Array.from({ length: 3 }).map((_, index) => {
                    const item = hero.inventory[index];
                    return (
                      <button 
                        key={index} 
                        onClick={() => item && hero.currentHealth > 0 && !heroAttacking && handleAttack(item)} 
                        style={{ ...weaponButtonStyle, position: 'relative' }} 
                        disabled={!item}
                      >
                      
                        <img 
                          src={`sprites/squares/Square_${index + 1}.png`} 
                          alt={`Slot ${index + 1}`} 
                          style={{ width: '100%', height: '100%' }} 
                        />
                        {item && (
                          <img 
                            src={`sprites/weapons/Item_${item.item_id}.png`} 
                            alt={item.name} 
                            style={{ width: '80%', height: '80%', position: 'absolute', top: '10%', left: '10%' }} 
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              <div style={dialogueContainerStyle}>
                <img src={`sprites/rectangles/Rectangle_1.png`} alt="dialogue-box" style={dialogueBoxStyle} />
                <div style={dialogueTextStyle}>{dialogue}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalBattleComponent;
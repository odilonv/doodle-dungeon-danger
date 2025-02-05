import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '@mui/material';
import BattleLoaderComponent from '../Loaders/BattleLoaderComponent';

const ModalBattleComponent = ({ isInBattle, handleClose, hero }) => {
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
                    <div>
                        <h2 id="simple-modal-title">Battle</h2>
                        <p id="simple-modal-description">You are in a battle</p>
                    </div>
                ) : (
                    <BattleLoaderComponent isTransitionning={isTransitionning} setIsTransitionning={setIsTransitionning} containerRef={containerRef} />
                )}
            </div>
        </Modal>
    );
};

export default ModalBattleComponent;

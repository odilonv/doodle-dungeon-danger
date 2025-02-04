import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '@mui/material';

const ModalBattleComponent = ({ isInBattle, handleClose }) => {
    const [boxesTop, setBoxesTop] = useState([]);
    const [boxesBottom, setBoxesBottom] = useState([]);
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

    useEffect(() => {
        if (isInBattle) {
            setBoxesTop([]);
            setBoxesBottom([]);
            let count = 0;

            const fillGrid = () => {
                if (!containerRef.current) return;

                const { clientWidth, clientHeight } = containerRef.current;
                const columns = Math.floor(clientWidth / boxSize);
                const rows = Math.floor(clientHeight / boxSize);
                const totalBoxes = columns * rows;

                const interval = setInterval(() => {
                    setBoxesTop(prevBoxes => {
                        if (prevBoxes.length >= totalBoxes / 2) {
                            clearInterval(interval);
                            setIsTransitionning(false);
                            return prevBoxes;
                        }
                        return [...prevBoxes, count++];
                    });
                    setBoxesBottom(prevBoxes => {
                        if (prevBoxes.length >= totalBoxes / 2) {
                            clearInterval(interval);
                            setIsTransitionning(false);
                            return prevBoxes;
                        }
                        return [...prevBoxes, count++];
                    });
                }, 10);

                return () => clearInterval(interval);
            };

            setTimeout(fillGrid, 100);
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
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                        }}
                    >
                        <div
                            style={{
                                width: '100%',
                                height: '50%',
                                display: 'grid',
                                gridTemplateColumns: `repeat(auto-fill, ${boxSize}px)`,
                                gridAutoRows: `${boxSize}px`,
                            }}
                        >
                            {boxesTop.map((_, index) => (
                                <div
                                    key={index}
                                    style={{
                                        width: `${boxSize}px`,
                                        height: `${boxSize}px`,
                                        backgroundColor: 'white',
                                        border: '2px solid white',
                                    }}
                                ></div>
                            ))}
                        </div>
                        <div
                            style={{
                                width: '100%',
                                height: '50%',
                                display: 'grid',
                                gridTemplateColumns: `repeat(auto-fill, ${boxSize}px)`,
                                gridAutoRows: `${boxSize}px`,
                                transform: 'rotate(180deg)',
                            }}
                        >
                            {boxesBottom.map((_, index) => (
                                <div
                                    key={index}
                                    style={{
                                        width: `${boxSize}px`,
                                        height: `${boxSize}px`,
                                        backgroundColor: 'white',
                                        border: 'none',
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ModalBattleComponent;

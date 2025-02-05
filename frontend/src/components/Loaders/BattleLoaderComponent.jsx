import React, { useState, useEffect } from 'react';

const BattleLoaderComponent = ({ isTransitionning, setIsTransitionning, containerRef }) => {
    const [boxesTop, setBoxesTop] = useState([]);
    const [boxesBottom, setBoxesBottom] = useState([]);
    const boxSize = 49;

    useEffect(() => {
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
            }, 5);

            return () => clearInterval(interval);
        };

        setTimeout(fillGrid, 100);
    }, []);

    return (
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
    );
}

export default BattleLoaderComponent;
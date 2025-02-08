import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { getUserDungeons, getDungeons, getCurrentUserDungeon } from '../../services/API/ApiDungeons';
import { getCurrentHero, nextDungeon } from '../../services/API/ApiHero';
import { saveMonsterInstance } from '../../services/API/ApiMonsters';

import { UserContext } from "../../contexts/UserContext";

import CircularProgress from '@mui/material/CircularProgress';

const weaponButtonStyle = {
    position: 'relative',
    overflow: 'hidden',
    background: 'none',
    border: 'none',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
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
    flexWrap: 'wrap',
    gap: '10px',
    height: '100%',
    width: '100%',
};

const DungeonsPage = () => {
    const { user } = useContext(UserContext);
    const [dungeons, setDungeons] = useState([]);
    const [userDungeons, setUserDungeons] = useState([]);
    const navigate = useNavigate();
    const [creatingDungeonInstance, setCreatingDungeonInstance] = useState(false);

    useEffect(() => {
        if (user) {
            getDungeons()
                .then(data => setDungeons(data))
                .catch(error => console.error(error));

            getUserDungeons(user)
                .then(data => setUserDungeons(data))
                .catch(error => console.error(error));
        }
    }, [user]);

    const onStartedDungeonClick = (dungeon) => {
        navigate(`/dungeon`);
    };

    const onNotStartedDungeonClick = async (dungeon) => {
        setCreatingDungeonInstance(true);
        const response = await getCurrentHero(user.id);
        const heroId = response.id;
        await nextDungeon(heroId);
        let dungeonInstance = null;
        while(dungeonInstance === null) {
            try {
                const response = await getCurrentUserDungeon(user);
                dungeonInstance = response.dungeonInstance;
                setCreatingDungeonInstance(false);
            } catch (error) {
                setTimeout(() => {}, 10000);
            }
        }

        const availableCells = [];
        dungeon.map.forEach((column, y) => {
            column.forEach((cell, x) => {
                if (cell === 0) availableCells.push({ y, x });
            });
        });
        for (const monster of dungeon.monsters) {
            for (let i = 0; i < monster.amount; i++) {
                if (availableCells.length === 0) break;
                const randomIndex = Math.floor(Math.random() * availableCells.length);
                const { x, y } = availableCells.splice(randomIndex, 1)[0];
                const position = { x: x, y: y };
                await saveMonsterInstance(monster.id, dungeonInstance.id, position);
            }
        }

        setCreatingDungeonInstance(false);
        navigate(`/dungeon`);
    }

    return (
        <div>
            {
                creatingDungeonInstance && (
                    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0, 0, 0, 0.5)' }}>
                        <CircularProgress />
                    </div>
                )
            }
            <h1>DungeonsPage</h1>
            <div style={actionsContainerStyle}>
                <div style={weaponsContainerStyle}>
                    {dungeons.map((dungeon, index) => {
                        const userDungeon = userDungeons.find(ud => ud.dungeonId === dungeon.id);
                        const previousDungeon = dungeons[index - 1];
                        const previousUserDungeon = previousDungeon
                            ? userDungeons.find(ud => ud.dungeonId === previousDungeon.id)
                            : null;

                        // Vérification des conditions de déblocage
                        const isUnlocked = dungeon.id === 1 || (previousUserDungeon && previousUserDungeon.status === 'Finished');
                        const isBlocked = !isUnlocked;

                        return (
                            <div
                                key={dungeon.id}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    height: '300px',
                                    width: '300px',
                                }}
                            >
                                <div
                                    style={weaponButtonStyle}
                                    disabled={isBlocked}
                                >
                                    <img src={`sprites/squares/Square_${index + 1}.png`} alt={dungeon.name} style={{ width: '100%', height: '100%' }} />
                                    <img src={`sprites/dungeons/${dungeon.name}.png`} alt={dungeon.name} style={{ width: '80%', height: '80%', position: 'absolute' }} />

                                    {userDungeon ? (
                                        userDungeon.status === 'Ongoing' ? (
                                            <div style={{
                                                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                                backdropFilter: 'blur(5px)', borderRadius: '10px', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center'
                                            }}
                                                onClick={() => onStartedDungeonClick(dungeon)}
                                            >
                                                <span style={{
                                                    color: 'black', fontSize: '40px',
                                                    fontWeight: 'bold', textShadow: '2px 2px 4px #000000'
                                                }}>
                                                    Continu
                                                </span>
                                                <img src={`sprites/arrow.png`} alt="arrow" style={{ width: '100%' }} />
                                            </div>
                                        ) : userDungeon.status === 'Finished' ? (
                                            <div style={{
                                                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                                backdropFilter: 'blur(5px)', borderRadius: '10px', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center'
                                            }}>
                                                <span style={{
                                                    color: 'black', fontSize: '40px',
                                                    fontWeight: 'bold', textShadow: '2px 2px 4px #000000'
                                                }}>
                                                    Finished
                                                </span>
                                                <img src={`sprites/tick.png`} alt="tick" style={{ width: '100%' }} />
                                            </div>
                                        ) : null
                                    ) : (
                                        isBlocked ? (
                                            <img src={`sprites/lock.png`} alt="lock" style={{ width: '50%', height: '50%', position: 'absolute' }} />
                                        ) : (
                                            <img src={`sprites/unlock.png`} alt="unlock" style={{ width: '50%', height: '50%', position: 'absolute' }}
                                                onClick={() => onNotStartedDungeonClick(dungeon)}
                                            />
                                        )
                                    )}
                                </div>
                                <span>{dungeon.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default DungeonsPage;

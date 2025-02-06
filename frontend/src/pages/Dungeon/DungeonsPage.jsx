import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { getUserDungeons, getDungeons } from '../../services/API/ApiDungeons';

import { UserContext } from "../../contexts/UserContext";

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
    gap: '10px',
    height: '100%',
    width: '100%',
};

const DungeonsPage = () => {
    const { user, setUser } = useContext(UserContext);
    const [dungeons, setDungeons] = useState([]);
    const [userDungeons, setUserDungeons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            getDungeons()
                .then(data => setDungeons(data))
                .catch(error => console.error(error));
            getUserDungeons(user)
                .then(data => setUserDungeons(data))
                .catch(error => console.error(error));
        } else {
            // navigate('/');
        }
    }, [user]);

    console.log(dungeons);
    console.log(userDungeons);

    return (
        <div>
            <h1>DungeonsPage</h1>
            <div style={actionsContainerStyle}>
                <div style={weaponsContainerStyle}>
                    {dungeons.map((dungeon, index) =>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <button key={dungeon.id} onClick={() => navigate("/dungeons/" + dungeon.id)} style={weaponButtonStyle}>
                                <img src={`sprites/squares/Square_${index + 1}.png`} alt={dungeon.name} style={{ width: '100%', height: '100%' }} />
                                <img src={`sprites/dungeons/${dungeon.name}.png`} alt={dungeon.name} style={{ width: '80%', height: '80%', position: 'absolute' }} />
                            </button>
                            <span>
                                {dungeon.name}
                            </span>
                        </div>
                    )}
                </div>
            </div>
            <button onClick={() => navigate('/choose-your-hero')}>
                Odilon
            </button>
        </div >
    );
}

export default DungeonsPage;
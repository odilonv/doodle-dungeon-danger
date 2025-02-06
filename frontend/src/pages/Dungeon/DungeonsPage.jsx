import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { getUserDungeons, getDungeons } from '../../services/API/ApiDungeons';

import { UserContext } from "../../contexts/UserContext";

const DungeonsPage = () => {
    const { user, setUser } = useContext(UserContext);
    const [dungeons, setDungeons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => async () => {
        if (user) {
            // getUserDungeons(user)
            //     .then(data => setDungeons(data))
            //     .catch(error => console.error(error));
            const response = await getDungeons();
            console.log(response);
            
        } else {
            navigate('/');
        }
    }, [user]);

    return (
        <div>
            <h1>DungeonsPage</h1>
            <ul>
                {dungeons.map(dungeon => <li key={dungeon.id}>{dungeon.name}</li>)}
            </ul>


        </div>
    );
}

export default DungeonsPage;
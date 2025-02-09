import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Map1Component } from "../../components";

import { getCurrentUserDungeon } from "../../services/API/ApiDungeons";
import { getMonstersByDungeonInstanceId } from "../../services/API/ApiMonsters";

import { UserContext, HeroContext } from "../../contexts";

const DungeonPage = () => {
    const { user } = useContext(UserContext);
    const { hero, setHero, loading: heroLoading } = useContext(HeroContext);
    const [dungeon, setDungeon] = useState(null);
    const [monsters, setMonsters] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDungeon = async () => {
            if (user) {
                try {
                    const currentUserDungeon = await getCurrentUserDungeon(user);
                    const { dungeon, dungeonInstance } = currentUserDungeon;
                    setDungeon(dungeon);

                    const monsters = await getMonstersByDungeonInstanceId(dungeonInstance.id);
                    setMonsters(monsters);
                } catch (error) {
                    console.error("Failed to fetch dungeon", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchDungeon();
    }, [user]);

    useEffect(() => {
        // if (!user || !hero) navigate("/login");
    }, [user, navigate]);

    if (loading || heroLoading) {
        return <p>Chargement en cours...</p>;
    }

    if (!dungeon) {
        return <p>Aucun donjon trouvé. Veuillez réessayer plus tard.</p>;
    }

    if (!hero) {
        return <p>Héros introuvable. Veuillez en créer un.</p>;
    }

    return (
        <div>
            <Map1Component hero={hero} setHero={setHero} map={dungeon.map} monsters={monsters} setMonsters={setMonsters} />
        </div>
    );
};

export default DungeonPage;

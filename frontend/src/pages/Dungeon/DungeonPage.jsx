import React, { useState, useEffect, useContext } from "react";
import { Map1Component } from "../../components";
import { getCurrentUserDungeon } from "../../services/API/ApiDungeons";
import { UserContext } from "../../contexts";

const DungeonPage = () => {
    const { user } = useContext(UserContext);
    const [dungeon, setDungeon] = useState(null);
    const [loading, setLoading] = useState(true);
    const characterImage = localStorage.getItem("characterImage");

    // Déplacer useState avant tout return conditionnel
    const [hero, setHero] = useState({
        position: { x: 0, y: 0 },
        name: "Hero",
        level: 1,
        power: 10,
        max_health: 110,
        current_health: 5,
        experience: 0,
        characterImage: characterImage,
    });

    useEffect(async () => {
        if (user) {
            const response = await getCurrentUserDungeon(user);
            const { dungeon, dungeonInstance } = response;
            console.log("dungeonInstance", dungeonInstance);
            console.log("dungeon", dungeon);

        } else {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <p>Chargement du donjon...</p>;
    }

    if (!dungeon) {
        return <p>Aucun donjon trouvé. Veuillez réessayer plus tard.</p>;
    }

    return (
        <div>
            <Map1Component hero={hero} setHero={setHero} map={dungeon.map} />
        </div>
    );
};

export default DungeonPage;

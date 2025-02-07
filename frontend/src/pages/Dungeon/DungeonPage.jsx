import React, { useState, useEffect, useContext } from "react";
import { Map1Component } from "../../components";
import { getCurrentUserDungeon } from "../../services/API/ApiDungeons";
import { UserContext, HeroContext, HeroProvider } from "../../contexts";

const DungeonPage = () => {
    const { user } = useContext(UserContext);
    const { hero, setHero, loading: heroLoading, error: heroError } = useContext(HeroContext);
    const [dungeon, setDungeon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDungeon = async () => {
            if (user) {
                try {
                    const response = await getCurrentUserDungeon(user);
                    const { dungeon, dungeonInstance } = response;
                    console.log("dungeonInstance", dungeonInstance);
                    console.log("dungeon", dungeon);
                    setDungeon(dungeon);
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

    if (loading || heroLoading) {
        return <p>Chargement en cours...</p>;
    }

    if (!dungeon) {
        return <p>Aucun donjon trouvé. Veuillez réessayer plus tard.</p>;
    }

    if (heroError) {
        return <p>Erreur: {heroError}</p>;
    }

    if (!hero) {
        return <p>Héros introuvable. Veuillez en créer un.</p>;
    }

    return (
        <HeroProvider userId={user?.id}>
            <div>
                <Map1Component hero={hero} setHero={setHero} map={dungeon.map} />
            </div>
        </HeroProvider>
    );
};

export default DungeonPage;

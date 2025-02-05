import React, { useState } from "react";

import { Map1Component } from "../../components";

const Dungeon1Page = () => {

    /* TODO REPLACE BY REAL DATA */
    const [hero, setHero] = useState({
        position: { x: 0, y: 0 },
        name: "Hero",
        level: 1,
        power: 10,
        max_health: 100,
        current_health: 100,
        experience: 0,
    });

    return (
        <div>
            <Map1Component hero={hero} setHero={setHero} />
        </div>
    );
}

export default Dungeon1Page;
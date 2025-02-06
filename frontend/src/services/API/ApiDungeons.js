async function getCurrentUserDungeon(user) {
    const response = await fetch(`http://localhost:5003/dungeons/lastInstance/user/${user.id}`, {
        method: 'GET',
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
    }
};

async function getUserDungeons(user) {
    const response = await fetch(`http://localhost:5003/dungeons/instances/user/${user.id}`, {
        method: 'GET',
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
    }
};

async function getDungeons() {
    const response = await fetch('http://localhost:5003/dungeons', {
        method: 'GET',
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
    }
};

async function saveDungeonInstance(dungeonId, userId) {
    const response = await fetch('http://localhost:5003/dungeons/instance', {
        method: 'POST',
        body: JSON.stringify({ dungeonInstance: { dungeonId: dungeonId, userId: userId } }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
    }
}

export {
    getCurrentUserDungeon,
    getUserDungeons,
    getDungeons,
    saveDungeonInstance
};
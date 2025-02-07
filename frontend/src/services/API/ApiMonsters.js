async function saveMonsterInstance(monsterId, dungeonInstanceId, position) {
    const response = await fetch('http://localhost:5005/monsters/instance', {
        method: 'POST',
        body: JSON.stringify({ monsterId: monsterId, dungeonInstanceId: dungeonInstanceId, position: position }),
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

async function getMonstersByDungeonInstanceId(dungeonInstanceId) {
    const response = await fetch(`http://localhost:5005/monsters/dungeonInstance/${dungeonInstanceId}`);
    if (response.ok) {
        return await response.json();
    } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
    }
}

export {
    saveMonsterInstance,
    getMonstersByDungeonInstanceId
};
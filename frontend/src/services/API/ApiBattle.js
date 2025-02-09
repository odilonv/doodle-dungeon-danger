async function startBattle(heroId, monsterInstanceId, dungeonInstanceId) {
    const response = await fetch('http://localhost:5004/battles', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ heroId, monsterInstanceId, dungeonInstanceId }),
        credentials: 'include',
    });

    try {
        return await response.json();
    } catch (error) {
        if (response.status === 409) {
            console.error('Already in battle');
        }
        else {
            throw new Error('Error starting battle : ' + error);
        }
    }

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error starting battle');
    }
}

async function getCurrentBattleByHeroId(heroId) {
    const response = await fetch(`http://localhost:5004/battles/hero/${heroId}`);
    if (response.status === 404) {
        return null;
    } else if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error getting battle');
    }
}

export { startBattle, getCurrentBattleByHeroId };
  
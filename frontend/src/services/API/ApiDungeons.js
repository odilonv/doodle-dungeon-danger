async function getUserDungeons(user) {
    const response = await fetch(`http://localhost:5003/dungeons/user/${user.id}`, {
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

export {
    getUserDungeons,
    getDungeons,
};
async function getUserDungeons(user) {
    const response = await fetch(`http://localhost:5003/dungeons/user/${user.id}`, {
        method: 'GET',
        credentials: 'include',
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
    }
};

export {
    getUserDungeons
};
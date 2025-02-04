async function login(user) {
    const response = await fetch('http://localhost:5001/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user }),
        credentials: 'include'
    });
    if (response.status === 200) {
        return await response.json();
    } else {
        throw new Error('Nom d\'utilisateur ou mot de passe incorrect');
    }
}

async function signUp(user) {
    try {
        const response = await fetch('http://localhost:5001/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user })
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

async function logout() {
    const response = await fetch('http://localhost:5001/users/logout', {
        method: 'GET',
        credentials: 'include'
    });
    const data = await response.json();
    return data;

}

async function getLoggedUser() {
    const response = await fetch('http://localhost:5001/users/session', {
        method: 'GET',
        credentials: 'include',
    });

    if (response.status === 200) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
}

async function updateUser(user) {
    const response = await fetch('http://localhost:5001/api/data/session/user', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (response.ok) {
        return await response.json();
    } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
    }
}

async function deleteUser(userId, password) {
    const response = await fetch('http://localhost:5001/users/', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password }),
    });

    return response;
}


async function changePassword(oldPassword, newPassword, confirmPassword) {
    const response = await fetch('http://localhost:5001/api/data/session/changePassword', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
    });

    return response;
}

export {
    login,
    signUp,
    logout,
    getLoggedUser,
    updateUser,
    deleteUser,
    changePassword
};
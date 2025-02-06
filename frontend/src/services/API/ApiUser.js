async function login(email, password) {
  const response = await fetch('http://localhost:5001/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Invalid email or password');
  }
}

async function signUp(firstName, lastName, email, password) {
  try {
    const response = await fetch('http://localhost:5001/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstName, lastName, email, password })
    });

    if (!response.ok) {
      throw new Error('Error creating user');
    }

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function logout() {
  const response = await fetch('http://localhost:5001/users/logout', {
    method: 'GET',
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Error logging out');
  }

  return response.json();
}

async function getLoggedUser() {
  const response = await fetch('http://localhost:5001/users/session', {
    method: 'GET',
    credentials: 'include'
  });

  if (response.ok) {
    return await response.json();
  } else {
    return null;
  }
}

async function updateUser(userId, firstName, lastName, email) {
  const response = await fetch(`http://localhost:5001/users/${userId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ firstName, lastName, email })
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || 'Error updating user');
  }

  return response.json();
}

async function deleteUser(userId) {
  const response = await fetch(`http://localhost:5001/users/${userId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    throw new Error('Error deleting user');
  }

  return response.json();
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

  if (!response.ok) {
    throw new Error('Error changing password');
  }

  return response.json();
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

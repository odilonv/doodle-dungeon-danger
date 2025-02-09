async function createHero(name, userId, avatar) {
  const response = await fetch('http://localhost:5002/heroes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ hero: { name, userId, avatar } }),
    credentials: 'include',
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Error creating hero');
  }
}

async function getHeroById(id) {
  const response = await fetch(`http://localhost:5002/heroes/${id}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Hero not found');
  }
}

async function getCurrentHero(userId) {
  const response = await fetch(`http://localhost:5002/heroes/user/${userId}/currentHero`, {
    method: 'GET',
    credentials: 'include',
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Current hero not found');
  }
}

async function takeDamage(id, damage) {
  const response = await fetch(`http://localhost:5002/heroes/takeDamage/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ damage }),
    credentials: 'include',
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Error taking damage');
  }
}

async function heal(id, healthPoints) {
  const response = await fetch(`http://localhost:5002/heroes/heal/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ healthPoints }),
    credentials: 'include',
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Error healing hero');
  }
}

async function gainExperience(id, experiencePoints) {
  const response = await fetch(`http://localhost:5002/heroes/gainExperience/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ experiencePoints }),
    credentials: 'include',
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Error gaining experience');
  }
}

async function move(id, position) {
  const response = await fetch(`http://localhost:5002/heroes/move/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ position }),
    credentials: 'include',
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Error moving hero');
  }
}

async function nextDungeon(id) {
  const response = await fetch(`http://localhost:5002/heroes/nextDungeon/${id}`, {
    method: 'POST',
    credentials: 'include',
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Error moving to next dungeon');
  }
}

async function deleteHero(id) {
  const response = await fetch(`http://localhost:5002/heroes/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Error deleting hero');
  }
}

async function pickUpItem(heroId, itemId) {
  const response = await fetch(`http://localhost:5002/heroes/iventory/pickUpItem/hero/${heroId}/item/${itemId}`, {
    method: 'POST',
    credentials: 'include',
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Error picking up item');
  }
}

async function dropItem(heroId, itemId) {
  const response = await fetch(`http://localhost:5002/heroes/iventory/dropItem/hero/${heroId}/item/${itemId}`, {
    method: 'POST',
    credentials: 'include',
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Error dropping item');
  }
}

async function battleUseItem(heroId, itemId) {
  const response = await fetch(`http://localhost:5002/heroes/iventory/useItem/hero/${heroId}/item/${itemId}`, {
    method: 'POST',
    credentials: 'include',
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Error using item');
  }
}

async function getInventory(heroId) {
  const response = await fetch(`http://localhost:5002/heroes/iventory/hero/${heroId}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Error fetching inventory');
  }
}

async function getItemById(id) {
  const response = await fetch(`http://localhost:5002/heroes/item/${id}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Item not found');
  }
}

export {
  createHero,
  getHeroById,
  takeDamage,
  heal,
  gainExperience,
  move,
  nextDungeon,
  deleteHero,
  pickUpItem,
  dropItem,
  battleUseItem,
  getInventory,
  getItemById,
  getCurrentHero,
};

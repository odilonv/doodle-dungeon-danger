import userService from '../services/userService.js';

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the user.' });
    }
};

export const createUser = async (req, res) => {
    try {
        res.status(201).json({ message: 'The user has been created.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating the user.' });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const success = await userService.deleteUser(id);
        if (success) {
            res.status(200).json({ message: 'User deleted successfully.' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting the user.' });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    try {
        const updatedUser = await userService.updateUser(id, firstName, lastName, email);
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the user.' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.loginUser(email, password);
        if (user) {
            req.session.user = user;
            res.json(user);
        } else {
            res.status(401).json({ message: 'Invalid email or password.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during login.' });
    }
};


export const sessionUser = (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).send('No active session.');
    }
};

export const logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('An error occurred while logging out.');
        }
        res.json({ message: 'Successfully logged out.' });
    });
};

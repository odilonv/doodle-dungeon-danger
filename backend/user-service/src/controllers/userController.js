import { UserService } from '../services/userService.js';

export const IdUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserService.getUserById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body.user;
    try {
        const newUser = await UserService.createUser(firstName, lastName, email, password);
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    const updatedUser = UserService.updateUser(userId, username, email);
    if (updatedUser) {
        res.json(updatedUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

export const deleteUser = async (req, res) => {
    const { userId, password } = req.body;
    try {
        const success = await UserService.deleteUser(userId, password);
        if (success) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body.user;
    try {
        const user = await UserService.loginUser(email, password);
        if (user) {
            req.session.user = user;
            res.json(user);
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const sessionUser = (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).send('Aucune session active.');
    }
};

export const logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Erreur lors de la déconnexion.');
        }
        res.json({ message: 'Déconnecté avec succès.' });
    });
};

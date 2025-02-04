import userRepository from './userRepository.js';
import bcrypt from 'bcrypt';
import User from './User.js';

export const UserService = {
    createUser: async (firstName, lastName, email, password) => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = {
            firstName,
            lastName,
            email,
            password: hashedPassword
        };

        console.log("New user", newUser);
        

        try {
            const connection = await userRepository.getInstance();
            await connection.query(
                'INSERT INTO user (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
                [newUser.firstName, newUser.lastName, newUser.email, newUser.password]
            );

            const [rows] = await connection.query('SELECT LAST_INSERT_ID() as id');
            newUser.id = rows[0].id;

            console.log(newUser);

            return newUser;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    loginUser: async (email, password) => {
        const connection = await userRepository.getInstance();
        const [results] = await connection.query('SELECT * FROM user WHERE email = ?', [email]);
        if (results.length > 0) {
            const userData = results[0];
            const hashedPassword = userData.password;
            const passwordMatch = await bcrypt.compare(password, hashedPassword);
            if (passwordMatch) {
                return User.fromDatabase(userData);
            }
        }
        return null;
    },

    deleteUser: async (userId) => {
        const connection = await userRepository.getInstance();
        const [result] = await connection.query('DELETE FROM user WHERE id = ?', [userId]);
        return result.affectedRows > 0;
    },

    getUserById: async (id) => {
        const connection = await userRepository.getInstance();
        const [results] = await connection.query('SELECT * FROM user WHERE id = ?', [id]);
        if (results.length > 0) {
            const userData = results[0];
            return User.fromDatabase(userData);
        }
        return null;
    }
};
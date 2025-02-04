import heroRepository from '../repositories/heroRepository.js';
import bcrypt from 'bcrypt';
import heroModel from '../models/heroModel.js';

export const UserService = {
    createHero: async (firstName, lastName, email, password) => {
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
            const connection = await heroRepository.getInstance();
            await connection.query(
                `INSERT INTO ${heroModel.tableName} (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`,
                [newUser.firstName, newUser.lastName, newUser.email, newUser.password]
            );

            const [rows] = await connection.query(`SELECT LAST_INSERT_ID() as id`);
            newUser.id = rows[0].id;

            console.log(newUser);

            return newUser;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    updateHero: async (userId, username, email) => {
        const connection = await heroRepository.getInstance();
        const [result] = await connection.query(`UPDATE ${heroModel.tableName} SET username = ?, email = ? WHERE id = ?`, [username, email, userId]);
        return result.affectedRows > 0;
    },

    deleteHero: async (userId) => {
        const connection = await heroRepository.getInstance();
        const [result] = await connection.query(`DELETE FROM ${heroModel.tableName} WHERE id = ?`, [userId]);
        return result.affectedRows > 0;
    },

    getHeroById: async (id) => {
        const connection = await heroRepository.getInstance();
        const [results] = await connection.query(`SELECT * FROM ${heroModel.tableName} WHERE id = ?`, [id]);
        if (results.length > 0) {
            const userData = results[0];
            return heroModel.fromDatabase(userData);
        }
        return null;
    }
};
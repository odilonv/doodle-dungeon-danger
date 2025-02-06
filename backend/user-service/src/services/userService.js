import bcrypt from 'bcrypt';
import UserRepository from '../repositories/userRepository.js';

const userRepository = new UserRepository();

class UserService {

    async createUser(firstName, lastName, email, password) {
        const existingUser = await userRepository.getUserByEmail(email);
        if (existingUser) {
            throw new Error('Email already in use');
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = { firstName, lastName, email, password: hashedPassword };

        const userId = await userRepository.createUser(newUser);
        return { id: userId, ...newUser };
    }

    async loginUser(email, password) {
        const user = await userRepository.getUserByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async getUserById(id) {
        return await userRepository.getUserById(id);
    }

    async deleteUser(id) {
        return await userRepository.deleteUser(id);
    }
}

export default new UserService();

import bcrypt from 'bcrypt';

class Hero {
    constructor(id, firstName, lastName, email, password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    static fromDatabase(data) {
        return new Hero(data.id, data.firstName, data.lastName, data.email, data.password);
    }

    static fromJson(data) {
        return new Hero(data.id, data.firstName, data.lastName, data.email, data.password);
    }

    static async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }
}

export default Hero;
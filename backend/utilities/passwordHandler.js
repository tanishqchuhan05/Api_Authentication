const bcrypt = require("bcryptjs");

class PasswordHandler {
    // Hash password
    static async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }

    // Compare password
    static async comparePassword(password, hashPassword) {
        return await bcrypt.compare(password, hashPassword);
        console.log()
    }
}

module.exports = PasswordHandler;

const jwt = require("jsonwebtoken");

class JWTHandler {
    // Generate JWT token
    static generateToken(user) {
        return jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
    }

    // Verify JWT token
    static verifyToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}

module.exports = JWTHandler;

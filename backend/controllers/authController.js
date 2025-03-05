const User = require("../models/userModel");
const APIResponse = require("../utilities/APIResponse");
const PasswordHandler = require ("../utilities/passwordHandler");
const JWTHandler = require("../utilities/jwtHandler");

const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Hash the password
        const hashedPassword = await PasswordHandler.hashPassword(password);


        // Create new user
        const newUser = new User({ username, password: hashedPassword, role });
        await newUser.save();

        return APIResponse.success(res, {status: 200, message: `User registered with username ${username}`, data: {username}} );
    } catch (error) {
        return APIResponse.error(res, {status: 500, message: "Registration failed", error});
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return APIResponse.error(res,{status: 404, message: `User with username ${username} not found`, error:{}});
        }

        // Compare passwords
        const isMatch = await PasswordHandler.comparePassword(password, user.password);
        if (!isMatch) {
            return APIResponse.error(res, {status: 400, message: "Invalid Credentials", error: {}});
        }

        // Generate JWT token
        const token = JWTHandler.generateToken(user);
        return APIResponse.success(res, {status: 200, message: "Login Successful", data:{token}});
    } catch (error) {
        return APIResponse.error(res, {status: 500, message: "Login Failed", error});
    }
};

module.exports = { register, login };

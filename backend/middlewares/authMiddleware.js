const APIResponse = require("../utilities/APIResponse");
const JWTHandler = require("../utilities/jwtHandler");

const authMiddleware = (req, res, next) => {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return APIResponse.error(res, { status: 403, message: "Access Denied: No Token Provided", error: {} });
    }

    try {
        const decoded = JWTHandler.verifyToken(authToken);
        req.user = decoded; // Attach user data to request object
        next(); // ✅ Proceed to the next middleware
    } catch (error) {
        return APIResponse.error(res, { status: 403, message: "Invalid Token", error });
    }
};

module.exports = authMiddleware;

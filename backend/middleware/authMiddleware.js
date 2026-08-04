const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    // Check for pre-authenticated user headers forwarded from XState server
    const userId = req.headers["x-user-id"];
    const userEmail = req.headers["x-user-email"];
    const userRole = req.headers["x-user-role"];

    if (userId) {
        const userObj = {
            id: Number(userId),
            email: userEmail,
            role: userRole || "student"
        };
        req.user = userObj;
        req.student = userObj;
        return next();
    }

    // Fallback if Authorization token header is passed directly
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        if (token) {
            try {
                const decoded = jwt.verify(
                    token,
                    process.env.JWT_SECRET || "my_super_secret_key_123456"
                );
                req.user = decoded;
                req.student = decoded;
                return next();
            } catch (error) {
                return res.status(401).json({
                    message: "Invalid or Expired Token"
                });
            }
        }
    }

    return res.status(401).json({
        message: "Access Denied. No Token Provided."
    });
};

module.exports = verifyToken;
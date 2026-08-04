const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Access Denied. No Token Provided."
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Access Denied. Malformed Token."
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "my_super_secret_key_123456"
        );
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or Expired Token"
        });
    }
};

const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
            message: "Forbidden: Admin Authorization Required"
        });
    }
    next();
};

module.exports = {
    verifyToken,
    requireAdmin
};

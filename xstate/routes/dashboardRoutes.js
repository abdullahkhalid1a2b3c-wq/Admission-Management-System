const express = require("express");
const { verifyToken, requireAdmin } = require("../middleware/authMiddleware");
const dashboardService = require("../services/dashboardService");

const router = express.Router();

// GET /dashboard
router.get("/", verifyToken, requireAdmin, async (req, res) => {
    try {
        const data = await dashboardService.getDashboardStats(req.user);
        res.json(data);
    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || { message: error.message }
        );
    }
});

// GET /dashboard/recent-applications
router.get("/recent-applications", verifyToken, requireAdmin, async (req, res) => {
    try {
        const data = await dashboardService.loadRecentApplications(req.user);
        res.json(data);
    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || { message: error.message }
        );
    }
});

module.exports = router;

const express = require("express");
const { verifyToken, requireAdmin } = require("../middleware/authMiddleware");
const reportService = require("../services/reportService");

const router = express.Router();

// GET /reports/admission
router.get("/admission", verifyToken, requireAdmin, async (req, res) => {
    try {
        const data = await reportService.getAdmissionReport(req.user);
        res.json(data);
    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || { message: error.message }
        );
    }
});

// GET /reports/departments
router.get("/departments", verifyToken, requireAdmin, async (req, res) => {
    try {
        const data = await reportService.getDepartmentReport(req.user);
        res.json(data);
    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || { message: error.message }
        );
    }
});

// GET /reports/eligibility
router.get("/eligibility", verifyToken, requireAdmin, async (req, res) => {
    try {
        const data = await reportService.getEligibilityReport(req.user);
        res.json(data);
    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || { message: error.message }
        );
    }
});

module.exports = router;

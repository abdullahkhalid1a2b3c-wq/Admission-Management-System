const express = require("express");

const router = express.Router();

const {
    getDashboardStats,
    loadRecentApplications
} = require("../controllers/dashboardController");

router.get("/", getDashboardStats);
router.get( "/recent-applications",
            loadRecentApplications);


module.exports = router;
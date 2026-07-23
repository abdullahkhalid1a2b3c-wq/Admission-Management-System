const express = require("express");

const router = express.Router();

const {
    getAdmissions,
    getAdmissionById,
    addAdmission,
    updateAdmission,
    updateAdmissionStatus,
    deleteAdmission,
    getMeritList
} = require("../controllers/admissionController");

// GET ALL
router.get("/", getAdmissions);

// MERIT LIST  (must come BEFORE /:id)
router.get("/merit-list", getMeritList);

// GET SINGLE
router.get("/:id", getAdmissionById);

// ADD
router.post("/", addAdmission);

// UPDATE
router.put("/:id", updateAdmission);

// UPDATE STATUS
router.patch("/:id/status", updateAdmissionStatus);

// DELETE
router.delete("/:id", deleteAdmission);

module.exports = router;
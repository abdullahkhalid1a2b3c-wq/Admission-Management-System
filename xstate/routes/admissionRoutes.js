const express = require("express");
const { createActor } = require("xstate");
const { admissionMachine } = require("../machines/admissionMachine");
const { verifyToken, requireAdmin } = require("../middleware/authMiddleware");
const { validateAdmissionSubmission, validateAdmissionAction } = require("../middleware/validatePayload");
const admissionService = require("../services/admissionService");

const router = express.Router();

// Helper to run admission machine approval/rejection actor
const runAdmissionActor = (req, res, eventType, admissionId) => {
    const actor = createActor(admissionMachine);
    actor.start();

    actor.send({
        type: eventType,
        id: admissionId,
        user: req.user
    });

    const subscription = actor.subscribe((state) => {
        if (state.matches("Approved") || state.matches("Rejected")) {
            subscription.unsubscribe();
            actor.stop();

            if (state.context.error) {
                return res.status(400).json(state.context.result || { message: state.context.error });
            }

            res.json(state.context.result);
        }
    });
};

// GET /admissions (Admin)
router.get("/", verifyToken, requireAdmin, async (req, res) => {
    try {
        const data = await admissionService.getAdmissions(req.user);
        res.json(data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
    }
});

// GET /admissions/merit-list (Admin)
router.get("/merit-list", verifyToken, requireAdmin, async (req, res) => {
    try {
        const data = await admissionService.getMeritList(req.user);
        res.json(data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
    }
});

// GET /admissions/:id
router.get("/:id", verifyToken, async (req, res) => {
    try {
        const data = await admissionService.getAdmissionById(req.params.id, req.user);
        res.json(data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
    }
});

// POST /admissions (Submit application)
router.post("/", verifyToken, validateAdmissionSubmission, async (req, res) => {
    try {
        const payload = {
            ...req.body,
            student_id: req.body.student_id || req.user.id
        };
        const data = await admissionService.addAdmission(payload, req.user);
        res.status(201).json(data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
    }
});

// PUT /admissions/:id (Update application details)
router.put("/:id", verifyToken, requireAdmin, async (req, res) => {
    try {
        const data = await admissionService.updateAdmission(req.params.id, req.body, req.user);
        res.json(data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
    }
});

// POST /admissions/approve (Admin)
router.post("/approve", verifyToken, requireAdmin, validateAdmissionAction, (req, res) => {
    const admissionId = req.body.id;
    runAdmissionActor(req, res, "APPROVE", admissionId);
});

// POST /admissions/reject (Admin)
router.post("/reject", verifyToken, requireAdmin, validateAdmissionAction, (req, res) => {
    const admissionId = req.body.id;
    runAdmissionActor(req, res, "REJECT", admissionId);
});

// PATCH /admissions/:id/status (Admin)
router.patch("/:id/status", verifyToken, requireAdmin, validateAdmissionAction, (req, res) => {
    const admissionId = req.params.id;
    const action = req.body.action || (req.body.status ? req.body.status.toUpperCase() : "APPROVE");
    const eventType = action === "REJECT" || action === "REJECTED" ? "REJECT" : "APPROVE";

    runAdmissionActor(req, res, eventType, admissionId);
});

module.exports = router;
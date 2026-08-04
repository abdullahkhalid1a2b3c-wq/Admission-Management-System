const express = require("express");
const { createActor } = require("xstate");
const { loginMachine } = require("../machines/loginMachine");
const { verifyToken } = require("../middleware/authMiddleware");
const { validateLogin, validateRegistration } = require("../middleware/validatePayload");
const authService = require("../services/authService");

const router = express.Router();

// POST /students/register
router.post("/register", validateRegistration, async (req, res) => {
    try {
        const response = await authService.registerStudent(req.body);
        res.status(201).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || { message: error.message }
        );
    }
});

// POST /students/login
router.post("/login", validateLogin, (req, res) => {
    const actor = createActor(loginMachine);
    actor.start();

    actor.send({
        type: "LOGIN",
        email: req.body.email,
        password: req.body.password,
        role: "student"
    });

    const subscription = actor.subscribe((state) => {
        if (state.matches("Authenticated") || state.matches("Failed")) {
            subscription.unsubscribe();
            actor.stop();

            const statusCode = state.matches("Authenticated") ? 200 : 401;
            res.status(statusCode).json(state.context.result || { message: state.context.error });
        }
    });
});

// GET /students/profile
router.get("/profile", verifyToken, async (req, res) => {
    try {
        const response = await authService.getStudentProfile(req.user);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || { message: error.message }
        );
    }
});

// GET /students/my-application
router.get("/my-application", verifyToken, async (req, res) => {
    try {
        const response = await authService.getMyApplication(req.user);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || { message: error.message }
        );
    }
});

module.exports = router;

const express = require("express");
const { createActor } = require("xstate");
const { loginMachine } = require("../machines/loginMachine");
const { validateLogin } = require("../middleware/validatePayload");

const router = express.Router();

router.post("/login", validateLogin, (req, res) => {
    const actor = createActor(loginMachine);
    actor.start();

    actor.send({
        type: "LOGIN",
        email: req.body.email,
        password: req.body.password,
        role: "admin"
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

module.exports = router;

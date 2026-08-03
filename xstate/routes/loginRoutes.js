const express = require("express");
const { createActor } = require("xstate");

const { loginMachine } = require("../machines/loginMachine");

const router = express.Router();

router.post("/", (req, res) => {

    const actor = createActor(loginMachine);

    actor.start();

    actor.send({

        type: "LOGIN",

        email: req.body.email,

        password: req.body.password

    });

    const subscription = actor.subscribe((state) => {

        if (

            state.matches("Authenticated") ||

            state.matches("Failed")

        ) {

            subscription.unsubscribe();

            actor.stop();

            res.status(

                state.matches("Authenticated") ? 200 : 401

            ).json(

                state.context.result

            );

        }

    });

});

module.exports = router;
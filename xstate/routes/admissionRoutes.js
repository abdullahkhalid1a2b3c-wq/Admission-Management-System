const express = require("express");
const { createActor } = require("xstate");

const { admissionMachine } = require("../machines/admissionMachine");

const router = express.Router();

router.post("/approve", async (req,res)=>{

    const actor=createActor(admissionMachine);

    actor.start();

    actor.send({

        type:"APPROVE",

        id:req.body.id

    });

    actor.subscribe(state=>{

        if(

            state.matches("Approved") ||

            state.matches("Rejected")

        ){

            res.json(state.context.result);

        }

    });

});
router.post("/reject", async (req,res)=>{

    const actor=createActor(admissionMachine);

    actor.start();

    actor.send({

        type:"REJECT",

        id:req.body.id

    });

    actor.subscribe(state=>{

        if(

            state.matches("Approved") ||

            state.matches("Rejected")

        ){

            res.json(state.context.result);

        }

    });

});

module.exports = router;
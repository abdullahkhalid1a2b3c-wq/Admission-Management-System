const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {

    registerStudent,
    loginStudent,
    getProfile,
    getMyApplication
} = require("../controllers/studentController");

router.post("/register", registerStudent);

router.post("/login", loginStudent);

router.get("/profile", verifyToken, getProfile);


router.get("/my-application",verifyToken,getMyApplication);


module.exports = router;
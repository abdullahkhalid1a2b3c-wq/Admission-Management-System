const express = require("express");
const cors = require("cors");

const admissionRoutes = require("./routes/admissionRoutes");
const loginRoutes = require("./routes/loginRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Admission FSM Routes
app.use("/admissions", admissionRoutes);

// Login FSM Routes
app.use("/login", loginRoutes);

app.listen(5000, () => {
    console.log("XState Server Running on Port 5000");
});
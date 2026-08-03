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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`XState Server Running on Port ${PORT}`);
});
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const admissionRoutes = require("./routes/admissionRoutes");
const loginRoutes = require("./routes/loginRoutes");
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/login", loginRoutes);
app.use("/students", studentRoutes);
app.use("/admin", adminRoutes);
app.use("/admissions", admissionRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/reports", reportRoutes);

app.get("/", (req, res) => {
    res.send("XState Gateway Server Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`XState Server Running on Port ${PORT}`);
});
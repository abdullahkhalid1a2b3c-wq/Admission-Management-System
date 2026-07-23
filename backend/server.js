const express = require("express");
const cors = require("cors");
require("./config/db");
require("dotenv").config();
const admissionRoutes = require("./routes/admissionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const studentRoutes=require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const reportRoutes = require("./routes/reportRoutes");
const app = express();

const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/admissions", admissionRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/students",studentRoutes);
app.use("/admin", adminRoutes);
app.use("/reports", reportRoutes);
// Home Route
app.get("/", (req, res) => {
    res.send(" Backend Running...");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



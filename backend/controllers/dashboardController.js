const db = require("../config/db");

// Dashboard Statistics
const getDashboardStats = (req, res) => {

    db.query(
        "SELECT COUNT(*) AS totalStudents FROM students",
        (err, studentResult) => {

            if (err) return res.status(500).json(err);

            const totalStudents = studentResult[0].totalStudents;

            const sql = `
                SELECT
    COUNT(*) AS total,
    SUM(CASE WHEN status='Pending' THEN 1 ELSE 0 END) AS pending,
    SUM(CASE WHEN status='Approved' THEN 1 ELSE 0 END) AS approved,
    SUM(CASE WHEN status='Rejected' THEN 1 ELSE 0 END) AS rejected
FROM admissions
            `;

            db.query(sql, (err, admissionResult) => {

                if (err) return res.status(500).json(err);

                res.json({

                    totalStudents,

                    ...admissionResult[0]

                });

            });

        }
    );

};


// ============================
// RECENT APPLICATIONS
// ============================

const loadRecentApplications = (req, res) => {

    const sql = `

        SELECT

            id,
            fullName,
            email,
            department,
            status
           

        FROM admissions

        ORDER BY id DESC

        

    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

module.exports = {
    getDashboardStats,
     loadRecentApplications
};




























































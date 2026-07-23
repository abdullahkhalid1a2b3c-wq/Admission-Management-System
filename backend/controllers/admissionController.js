const db = require("../config/db");

// =======================
// GET ALL ADMISSIONS
// =======================
const getAdmissions = (req, res) => {

    const sql = "SELECT * FROM admissions";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

// =======================
// GET SINGLE ADMISSION
// =======================
const getAdmissionById = (req, res) => {

    const id = req.params.id;

    const sql = "SELECT * FROM admissions WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {

            return res.status(404).json({
                message: "Admission Not Found"
            });

        }

        res.json(result[0]);

    });

};







// =======================
// ADD ADMISSION
// =======================
// =======================
// ADD ADMISSION
// =======================
const addAdmission = (req, res) => {

    const {

        student_id,

        fullName,
        fatherName,
        gender,
        dob,
        email,
        phone,

        matricBoard,
        matricRollNo,
        matricTotalMarks,
        matricObtainedMarks,

        fscBoard,
        fscRollNo,
        fscTotalMarks,
        fscObtainedMarks,

        department,
        session,
        campus

    } = req.body;



    // =======================
    // MERIT CALCULATION
    // =======================

    const matricPercentage =
        (matricObtainedMarks / matricTotalMarks) * 100;


    const fscPercentage =
        (fscObtainedMarks / fscTotalMarks) * 100;


    const merit =
        (matricPercentage * 0.4) +
        (fscPercentage * 0.6);


    const eligibility =
        (
            matricPercentage >= 60 &&
            fscPercentage >= 60
        )
        ?
        "Eligible"
        :
        "Not Eligible";



    const sql = `

    INSERT INTO admissions(

        student_id,

        fullName,
        fatherName,
        gender,
        dob,
        email,
        phone,


        matricBoard,
        matricRollNo,
        matricTotalMarks,
        matricObtainedMarks,


        fscBoard,
        fscRollNo,
        fscTotalMarks,
        fscObtainedMarks,


        department,
        session,
        campus,


        matricPercentage,
        fscPercentage,
        merit,
        eligibility,


        status

    )


    VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)


    `;



    const values = [


        student_id,


        fullName,
        fatherName,
        gender,
        dob,
        email,
        phone,


        matricBoard,
        matricRollNo,
        matricTotalMarks,
        matricObtainedMarks,


        fscBoard,
        fscRollNo,
        fscTotalMarks,
        fscObtainedMarks,


        department,
        session,
        campus,


        matricPercentage,
        fscPercentage,
        merit,
        eligibility,


        "Pending"


    ];



    db.query(sql, values, (err, result) => {


        if (err) {

            console.log(err);

            return res.status(500).json(err);

        }


        res.status(201).json({

            message: "Admission Submitted Successfully",

            id: result.insertId,

            eligibility,

            merit

        });


    });


};

// =======================
// UPDATE ADMISSION
// =======================
const updateAdmission = (req, res) => {

    const id = req.params.id;

    const {

        fullName,
        fatherName,
        gender,
        dob,
        email,
        phone,

        matricBoard,
        matricRollNo,
        matricTotalMarks,
        matricObtainedMarks,

        fscBoard,
        fscRollNo,
        fscTotalMarks,
        fscObtainedMarks,

        department,
        session,
        campus,

        status

    } = req.body;

    const sql = `

    UPDATE admissions SET

        fullName=?,
        fatherName=?,
        gender=?,
        dob=?,
        email=?,
        phone=?,

        matricBoard=?,
        matricRollNo=?,
        matricTotalMarks=?,
        matricObtainedMarks=?,

        fscBoard=?,
        fscRollNo=?,
        fscTotalMarks=?,
        fscObtainedMarks=?,

        department=?,
        session=?,
        campus=?,
        status=?

    WHERE id=?

    `;

    const values = [

        fullName,
        fatherName,
        gender,
        dob,
        email,
        phone,

        matricBoard,
        matricRollNo,
        matricTotalMarks,
        matricObtainedMarks,

        fscBoard,
        fscRollNo,
        fscTotalMarks,
        fscObtainedMarks,

        department,
        session,
        campus,

        status,

        id

    ];

    db.query(sql, values, (err) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({

            message: "Admission Updated Successfully"

        });

    });

};

const updateAdmissionStatus = (req, res) => {

    const id = req.params.id;

    const { status } = req.body;

    const sql = `
        UPDATE admissions
        SET status=?
        WHERE id=?
    `;

    db.query(sql, [status, id], (err) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Status Updated Successfully"
        });

    });

};

// =======================
// DELETE ADMISSION
// =======================
const deleteAdmission = (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM admissions WHERE id=?";

    db.query(sql, [id], (err) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({

            message: "Admission Deleted Successfully"

        });

    });

};


const getMeritList = (req, res) => {

    const sql = `

        SELECT
            id,
            fullName,
            department,
            merit,
            eligibility,
            status

        FROM admissions

        WHERE eligibility = 'Eligible'

        ORDER BY merit DESC

    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

module.exports = {

    getAdmissions,
    getAdmissionById,
    addAdmission,
    updateAdmission,
    updateAdmissionStatus,
    deleteAdmission,
      getMeritList

};
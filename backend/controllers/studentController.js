const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/authMiddleware");
// ===========================
// STUDENT REGISTERation funtion
// ===========================

const registerStudent = async (req, res) => {

    try {

        const {
            
            fullName,
            email,
            password,
            phone

        } = req.body;

 // hash password we have using the function bcrypt hash after installng the pakage and requiring it at top 
// const hashedpassword = await bcrypt.hash(password,10)
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `

            INSERT INTO students(

                fullName,
                email,
                password,
                phone

            )

            VALUES(?,?,?,?)

        `;

        db.query(

            sql,

            [

                fullName,
                email,
                hashedPassword,
                phone

            ],

            (err, result) => {

                if (err) {

                    return res.status(500).json(err);

                }

                res.status(201).json({

                    message: "Student Registered Successfully",

                    studentId: result.insertId

                });

            }

        );

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// ===========================
// STUDENT LOGIN function
// ===========================

const loginStudent = (req, res) => {
    const { email, password } = req.body;

    const sql = `
        SELECT *
        FROM students
        WHERE email = ?
    `;

db.query(sql, [email], async (err, result) => {

    console.log("Database Result:", result);

    if (err) {
        return res.status(500).json(err);
    }

    if (result.length === 0) {

            return res.status(401).json({

                message: "Invalid Email or Password"

            });

        }

       const student = result[0];

console.log("================================");
console.log("Email Entered:", email);
console.log("Password Entered:", password);
console.log("Password In Database:", student.password);

const isMatch = await bcrypt.compare(
    password,
    student.password
);

console.log("Password Match:", isMatch);
console.log("================================");

        if (!isMatch) {

            return res.status(401).json({

                message: "Invalid Email or Password"

            });

        }

        // Generate JWT

        const token = jwt.sign(

            {

                id: student.id,

                email: student.email

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "1d"

            }

        );

        res.json({

            message: "Login Successful",

            token,

            student: {

                id: student.id,

                fullName: student.fullName,

                email: student.email,

                phone: student.phone

            }

        });

    });

};


const getProfile = (req, res) => {

    const sql = `
        SELECT id,
               fullName,
               email,
               phone
        FROM students
        WHERE id = ?
    `;

    db.query(

        sql,

        [req.student.id],

        (err, result) => {

            if (err) {

                return res.status(500).json(err);

            }

            res.json(result[0]);

        }

    );

};


const getMyApplication = (req, res) => {

    const studentId = req.user.id;

    const sql = `

        SELECT *
        FROM admissions
        WHERE student_id = ?

    `;

    db.query(sql, [studentId], (err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        if (result.length === 0) {

            return res.status(404).json({

                message: "No Application Found"

            });

        }

        res.json(result[0]);

    });

};

module.exports={

    registerStudent,
    loginStudent,
     getProfile,
      getMyApplication


};



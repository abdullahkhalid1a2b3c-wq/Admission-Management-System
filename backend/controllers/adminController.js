const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const loginAdmin = (req, res) => {

    const { email, password } = req.body;

    const sql = `
        SELECT *
        FROM admins
        WHERE email = ?
    `;

    db.query(sql, [email], async (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }

        const admin = result[0];

        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }

    const token = jwt.sign(

    {
        id: admin.id,
        email: admin.email,
        role: "admin"
    },

    process.env.JWT_SECRET,

    {
        expiresIn: "1d"
    }

);

res.json({

    message: "Admin Login Successful",

    token,

    admin: {

        id: admin.id,
        name: admin.name,
        email: admin.email

    }

});

    });

};

module.exports = {
    loginAdmin
};
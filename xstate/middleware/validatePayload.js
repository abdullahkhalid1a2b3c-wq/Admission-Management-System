const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required."
        });
    }
    next();
};

const validateRegistration = (req, res, next) => {
    const { fullName, email, password, phone } = req.body;
    if (!fullName || !email || !password || !phone) {
        return res.status(400).json({
            message: "All fields (fullName, email, password, phone) are required."
        });
    }
    next();
};

const validateAdmissionSubmission = (req, res, next) => {
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
        campus
    } = req.body;

    if (
        !fullName ||
        !fatherName ||
        !gender ||
        !dob ||
        !email ||
        !phone ||
        !matricBoard ||
        !matricRollNo ||
        matricTotalMarks === undefined ||
        matricObtainedMarks === undefined ||
        !fscBoard ||
        !fscRollNo ||
        fscTotalMarks === undefined ||
        fscObtainedMarks === undefined ||
        !department ||
        !session ||
        !campus
    ) {
        return res.status(400).json({
            message: "Missing required admission application fields."
        });
    }
    next();
};

const validateAdmissionAction = (req, res, next) => {
    const id = req.body.id || req.params.id;
    const action = req.body.action || (req.body.status ? req.body.status.toUpperCase() : null);

    if (!id) {
        return res.status(400).json({
            message: "Admission ID is required."
        });
    }

    if (!action || (action !== "APPROVE" && action !== "REJECT" && action !== "APPROVED" && action !== "REJECTED")) {
        return res.status(400).json({
            message: "Action must be APPROVE or REJECT."
        });
    }

    next();
};

module.exports = {
    validateLogin,
    validateRegistration,
    validateAdmissionSubmission,
    validateAdmissionAction
};

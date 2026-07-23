const express = require("express");

const router = express.Router();


const {

    getAdmissionReport,
    getDepartmentReport,
    getEligibilityReport

} = require("../controllers/reportController");



// Admission statistics
router.get(
    "/admission",
    getAdmissionReport
);


// Department wise report
router.get(
    "/departments",
    getDepartmentReport
);


// Eligibility report
router.get(
    "/eligibility",
    getEligibilityReport
);



module.exports = router;
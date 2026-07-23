const db = require("../config/db");


// =========================
// ADMISSION REPORT
// =========================

const getAdmissionReport = (req,res)=>{


const sql = `

SELECT

COUNT(*) AS total,

SUM(status='Pending') AS pending,

SUM(status='Approved') AS approved,

SUM(status='Rejected') AS rejected


FROM admissions

`;



db.query(sql,(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json(result[0]);


});


};



// =========================
// DEPARTMENT REPORT
// =========================

const getDepartmentReport = (req,res)=>{


const sql = `

SELECT

department,

COUNT(*) AS total


FROM admissions

GROUP BY department


ORDER BY total DESC


`;



db.query(sql,(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json(result);


});


};



// =========================
// ELIGIBILITY REPORT
// =========================

const getEligibilityReport = (req,res)=>{


const sql = `

SELECT

eligibility,

COUNT(*) AS total


FROM admissions

GROUP BY eligibility


`;



db.query(sql,(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json(result);


});


};



module.exports={

getAdmissionReport,

getDepartmentReport,

getEligibilityReport

};
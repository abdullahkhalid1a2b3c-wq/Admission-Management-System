const axios = require("axios");

const getBackendUrl = () => process.env.BACKEND_URL || "http://localhost:3000";

const buildHeaders = (user) => {
    if (!user) return {};
    return {
        "x-user-id": user.id,
        "x-user-email": user.email,
        "x-user-role": user.role || "admin"
    };
};

async function getAdmissionReport(user) {
    const response = await axios.get(`${getBackendUrl()}/reports/admission`, {
        headers: buildHeaders(user)
    });
    return response.data;
}

async function getDepartmentReport(user) {
    const response = await axios.get(`${getBackendUrl()}/reports/departments`, {
        headers: buildHeaders(user)
    });
    return response.data;
}

async function getEligibilityReport(user) {
    const response = await axios.get(`${getBackendUrl()}/reports/eligibility`, {
        headers: buildHeaders(user)
    });
    return response.data;
}

module.exports = {
    getAdmissionReport,
    getDepartmentReport,
    getEligibilityReport
};

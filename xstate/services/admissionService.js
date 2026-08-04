const axios = require("axios");

const getBackendUrl = () => process.env.BACKEND_URL || "http://localhost:3000";

const buildHeaders = (user) => {
    if (!user) return {};
    return {
        "x-user-id": user.id,
        "x-user-email": user.email,
        "x-user-role": user.role || "student"
    };
};

async function updateAdmissionStatus(id, action, user) {
    const response = await axios.patch(
        `${getBackendUrl()}/admissions/${id}/status`,
        { action },
        { headers: buildHeaders(user) }
    );
    return response.data;
}

async function getAdmissions(user) {
    const response = await axios.get(`${getBackendUrl()}/admissions`, {
        headers: buildHeaders(user)
    });
    return response.data;
}

async function getAdmissionById(id, user) {
    const response = await axios.get(`${getBackendUrl()}/admissions/${id}`, {
        headers: buildHeaders(user)
    });
    return response.data;
}

async function addAdmission(data, user) {
    const response = await axios.post(`${getBackendUrl()}/admissions`, data, {
        headers: buildHeaders(user)
    });
    return response.data;
}

async function updateAdmission(id, data, user) {
    const response = await axios.put(`${getBackendUrl()}/admissions/${id}`, data, {
        headers: buildHeaders(user)
    });
    return response.data;
}

async function getMeritList(user) {
    const response = await axios.get(`${getBackendUrl()}/admissions/merit-list`, {
        headers: buildHeaders(user)
    });
    return response.data;
}

module.exports = {
    updateAdmissionStatus,
    getAdmissions,
    getAdmissionById,
    addAdmission,
    updateAdmission,
    getMeritList
};
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

async function getDashboardStats(user) {
    const response = await axios.get(`${getBackendUrl()}/dashboard`, {
        headers: buildHeaders(user)
    });
    return response.data;
}

async function loadRecentApplications(user) {
    const response = await axios.get(`${getBackendUrl()}/dashboard/recent-applications`, {
        headers: buildHeaders(user)
    });
    return response.data;
}

module.exports = {
    getDashboardStats,
    loadRecentApplications
};

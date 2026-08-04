const axios = require("axios");

const getBackendUrl = () => process.env.BACKEND_URL || "http://localhost:3000";

function loginStudent(email, password) {
    return axios.post(`${getBackendUrl()}/students/login`, {
        email,
        password
    });
}

function loginAdmin(email, password) {
    return axios.post(`${getBackendUrl()}/admin/login`, {
        email,
        password
    });
}

function loginUser(email, password, role = "student") {
    if (role === "admin") {
        return loginAdmin(email, password);
    }
    return loginStudent(email, password);
}

function registerStudent(studentData) {
    return axios.post(`${getBackendUrl()}/students/register`, studentData);
}

function getStudentProfile(user) {
    return axios.get(`${getBackendUrl()}/students/profile`, {
        headers: {
            "x-user-id": user.id,
            "x-user-email": user.email,
            "x-user-role": user.role || "student"
        }
    });
}

function getMyApplication(user) {
    return axios.get(`${getBackendUrl()}/students/my-application`, {
        headers: {
            "x-user-id": user.id,
            "x-user-email": user.email,
            "x-user-role": user.role || "student"
        }
    });
}

module.exports = {
    loginStudent,
    loginAdmin,
    loginUser,
    registerStudent,
    getStudentProfile,
    getMyApplication
};
import axios from "axios";

export function loginStudent(email, password) {
    return axios.post(
        `${process.env.BACKEND_URL}/students/login`,
        {
            email,
            password
        }
    );
}
import axios from "axios";

export function loginStudent(email, password) {

    return axios.post(

        "http://localhost:3000/students/login",

        {

            email,

            password

        }

    );

}






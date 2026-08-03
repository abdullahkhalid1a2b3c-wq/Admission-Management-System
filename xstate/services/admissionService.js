import axios from "axios";

export async function updateAdmissionStatus(id, action) {

    const response = await axios.patch(

        `http://localhost:3000/admissions/${id}/status`,

        {

            action

        }

    );

    return response.data;

}


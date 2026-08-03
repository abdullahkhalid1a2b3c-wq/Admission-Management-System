import axios from "axios";

export async function updateAdmissionStatus(id, action) {

    const response = await axios.patch(

        `${process.env.BACKEND_URL}/admissions/${id}/status`,

        {
            action
        }

    );

    return response.data;

}
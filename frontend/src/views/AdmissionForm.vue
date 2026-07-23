<template>

<div>
    <h1>Admission Form</h1>

    <form @submit.prevent="submitApplication">

        <h2>Personal Information</h2>

        <label>Full Name</label>
        <input
            type="text"
            v-model="application.fullName"
        />

        <label>Father Name</label>
        <input
            type="text"
            v-model="application.fatherName"
        />

        <label>Gender</label>
        <select v-model="application.gender">
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
        </select>

        <label>Date of Birth</label>
        <input
            type="date"
            v-model="application.dob"
        />

        <label>Email</label>
        <input
            type="email"
            v-model="application.email"
        />

        <label>Phone</label>
        <input
            type="text"
            v-model="application.phone"
        />

        <h2>Academic Information</h2>

        <label>Matric Board</label>
        <input
            type="text"
            v-model="application.matricBoard"
        />

        <label>Matric Roll No</label>
        <input
            type="text"
            v-model="application.matricRollNo"
        />

        <label>Matric Total Marks</label>
        <input
            type="number"
            v-model="application.matricTotalMarks"
        />

        <label>Matric Obtained Marks</label>
        <input
            type="number"
            v-model="application.matricObtainedMarks"
        />

        <label>FSc Board</label>
        <input
            type="text"
            v-model="application.fscBoard"
        />

        <label>FSc Roll No</label>
        <input
            type="text"
            v-model="application.fscRollNo"
        />

        <label>FSc Total Marks</label>
        <input
            type="number"
            v-model="application.fscTotalMarks"
        />

        <label>FSc Obtained Marks</label>
        <input
            type="number"
            v-model="application.fscObtainedMarks"
        />

        <h2>Admission Information</h2>

        <label>Department</label>

        <select v-model="application.department">

            <option value="">Select Department</option>
            <option>Computer Science</option>
            <option>Software Engineering</option>
            <option>Information Technology</option>
            <option>Artificial Intelligence</option>

        </select>

        <label>Session</label>
        <input
            type="text"
            v-model="application.session"
        />

        <label>Campus</label>
        <input
            type="text"
            v-model="application.campus"
        />

        <button type="submit">
            Submit Application
        </button>

    </form>

</div>

</template>

<script setup>
import { reactive } from "vue";
import axios from "axios";

const student = JSON.parse(
    localStorage.getItem("student")
);

const application = reactive({
    student_id: student.id,
  fullName: "",
  fatherName: "",
  gender: "",
  dob: "",
  email: "",
  phone: "",

    // Academic Information
    matricBoard: "",
    matricRollNo: "",
    matricTotalMarks: "",
    matricObtainedMarks: "",

    fscBoard: "",
    fscRollNo: "",
    fscTotalMarks: "",
    fscObtainedMarks: "",

    // Admission Information
    department: "",
    session: "",
    campus: ""
});



  async function submitApplication() {

    try {

        console.log(application);
      
    console.log(application);
      const response = await axios.post(
        "http://localhost:3000/admissions",
        application
      );

      console.log(response.data);

      alert("Admission Submitted Successfully!");

    }

    catch (error) {

      console.log(error);

    }

  }
</script>

<style scoped>

input,
select{

display:block;
width:300px;
padding:8px;
margin-bottom:15px;

}

button{

margin-top:20px;
padding:10px 20px;

}

</style>
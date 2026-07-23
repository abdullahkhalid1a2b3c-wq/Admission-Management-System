<template>

<div v-if="student">

<h1>Admission Details</h1>

<hr>

<h2>Personal Information</h2>

<p><b>Full Name:</b> {{ student.fullName }}</p>

<p><b>Father Name:</b> {{ student.fatherName }}</p>

<p><b>Gender:</b> {{ student.gender }}</p>

<p><b>Date of Birth:</b> {{ student.dob }}</p>

<p><b>Email:</b> {{ student.email }}</p>

<p><b>Phone:</b> {{ student.phone }}</p>

<hr>

<h2>Matric Information</h2>

<p><b>Board:</b> {{ student.matricBoard }}</p>

<p><b>Roll No:</b> {{ student.matricRollNo }}</p>

<p><b>Total Marks:</b> {{ student.matricTotalMarks }}</p>

<p><b>Obtained Marks:</b> {{ student.matricObtainedMarks }}</p>

<hr>

<h2>FSc Information</h2>

<p><b>Board:</b> {{ student.fscBoard }}</p>

<p><b>Roll No:</b> {{ student.fscRollNo }}</p>

<p><b>Total Marks:</b> {{ student.fscTotalMarks }}</p>

<p><b>Obtained Marks:</b> {{ student.fscObtainedMarks }}</p>

<hr>

<h2>Admission Information</h2>

<p><b>Department:</b> {{ student.department }}</p>

<p><b>Session:</b> {{ student.session }}</p>

<p><b>Campus:</b> {{ student.campus }}</p>

<p><b>Merit:</b> {{ student.merit }}%</p>

<p>
<b>Eligibility:</b>

<span
:class="student.eligibility"
>

{{ student.eligibility }}

</span>

</p>

<p><b>Status:</b> {{ student.status }}</p>

<br>

<button @click="changeStatus('Approved')">
Approve
</button>

<button @click="changeStatus('Rejected')">
Reject
</button>

</div>

</template>

<script setup>

import axios from "axios"
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()

const student = ref(null)

async function loadStudent(){

    try{

        const response = await axios.get(
            `http://localhost:3000/admissions/${route.params.id}`
        )

        student.value = response.data

    }

    catch(error){

        console.log(error)

    }

}

async function changeStatus(status){

    try{

        await axios.patch(

            `http://localhost:3000/admissions/${route.params.id}/status`,

            {
                status
            }

        )

        alert("Status Updated Successfully")

        router.push("/admin/admissions")

    }

    catch(error){

        console.log(error)

    }

}

onMounted(loadStudent)

</script>

<style scoped>

h1{

margin-bottom:20px;

}

h2{

margin-top:25px;
color:#42b883;

}

p{

margin:8px 0;

}

hr{

margin:20px 0;

}

button{

margin-right:15px;
padding:10px 20px;
border:none;
border-radius:5px;
cursor:pointer;
background:#42b883;
color:white;

}

button:hover{

background:#36996f;

}


.Eligible{

color:green;

font-weight:bold;

}

.Not\ Eligible{

color:red;

font-weight:bold;

}

</style>
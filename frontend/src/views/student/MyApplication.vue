<template>

<div v-if="application">

<h1>My Application</h1>

<p><b>Name:</b> {{ application.fullName }}</p>

<p><b>Father:</b> {{ application.fatherName }}</p>

<p><b>Email:</b> {{ application.email }}</p>

<p><b>Phone:</b> {{ application.phone }}</p>

<p><b>Department:</b> {{ application.department }}</p>

<p><b>Session:</b> {{ application.session }}</p>

<p><b>Campus:</b> {{ application.campus }}</p>

<p><b>Status:</b> {{ application.status }}</p>

</div>

<div v-else>

<h2>No Admission Submitted Yet</h2>

</div>

</template>

<script setup>

import axios from "axios"

import { ref, onMounted } from "vue"

const application = ref(null)

async function loadApplication(){

const token = localStorage.getItem("token");

const response = await axios.get(

"http://localhost:3000/students/my-application",

{

headers: {

Authorization: `Bearer ${token}`

}

}

);

application.value = response.data;


}

onMounted(() => {

loadApplication()

})

</script>
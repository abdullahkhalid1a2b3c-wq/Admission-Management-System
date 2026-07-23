<template>

<div>

<h1>Student Registration</h1>

<form @submit.prevent="registerStudent">

<label>Full Name</label>

<input
type="text"
v-model="student.fullName"
/>

<label>Email</label>

<input
type="email"
v-model="student.email"
/>

<label>Password</label>

<input
type="password"
v-model="student.password"
/>

<label>Phone</label>

<input
type="text"
v-model="student.phone"
/>

<button type="submit">

Register

</button>

</form>

</div>

</template>

<script setup>

import { reactive } from "vue"

import axios from "axios"

const student = reactive({

fullName:"",

email:"",

password:"",

phone:""

})

async function registerStudent(){

try{

const response = await axios.post(

"http://localhost:3000/students/register",

student

)

alert(response.data.message)

student.fullName=""

student.email=""

student.password=""

student.phone=""

}

catch(error){

console.log(error)

alert("Registration Failed")

}

}

</script>

<style scoped>

input{

display:block;

width:300px;

padding:10px;

margin-bottom:15px;

}

button{

padding:10px 20px;

cursor:pointer;

}

</style>
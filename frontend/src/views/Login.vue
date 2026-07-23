<template>

<div>

<h1>Student Login</h1>

<form @submit.prevent="loginStudent">

<label>Email</label>

<input
type="email"
v-model="login.email"
/>

<label>Password</label>

<input
type="password"
v-model="login.password"
/>

<button type="submit">

Login

</button>

</form>

</div>

</template>

<script setup>
// console.log("Login.vue Loaded");
import { reactive } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"

const router = useRouter()

const login = reactive({

email: "",

password: ""

})
async function loginStudent() {

    console.log("1. Login button clicked");

    try {

        console.log("2. Sending request...");

        const response = await axios.post(
            "http://localhost:3000/students/login",
            login
        );

        console.log("3. Response received:", response);

        localStorage.setItem("token", response.data.token);

        localStorage.setItem(
            "student",
            JSON.stringify(response.data.student)
        );

        console.log("4. Saved to localStorage");

        alert(response.data.message);

        router.push("/student/dashboard");

    } catch (error) {

        console.log("ERROR:", error);

        alert("Invalid Email or Password");

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
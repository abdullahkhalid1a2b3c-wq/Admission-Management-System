<template>

<div>

<h1>Admin Login</h1>

<form @submit.prevent="loginAdmin">

<label>Email</label>

<input
type="email"
v-model="admin.email"
/>

<label>Password</label>

<input
type="password"
v-model="admin.password"
/>

<button type="submit">

Login

</button>

</form>

</div>

</template>

<script setup>

import { reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const admin = reactive({

    email: "",

    password: ""

});

async function loginAdmin(){

    try{

        const response = await axios.post(

            "http://localhost:3000/admin/login",

            admin

        );

        localStorage.setItem(

            "adminToken",

            response.data.token

        );

        localStorage.setItem(

            "admin",

            JSON.stringify(response.data.admin)

        );

        alert(response.data.message);

        router.push("/admin/dashboard");

    }

    catch(error){

        alert("Invalid Admin Credentials");

        console.log(error);

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
<template>

<nav class="navbar">

<h2>Student Portal</h2>

<div>


<!-- Welcome Student

<router-link to="/student/dashboard">

Dashboard

</router-link> -->

    <router-link to = "/student/register">
Register
</router-link>
<router-link to = "/student/login">
log in
</router-link>


<button class="b1" @click="logout">

Logout

</button>


</div>

</nav>

</template>

<script setup>

import { useRouter } from "vue-router";

const router = useRouter();

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("student");

    router.push("/student/login");

}

</script>

<style scoped>

.navbar{

height:70px;

background:#486ec0;

color:white;

display:flex;

justify-content:space-between;

align-items:center;

padding:0 30px;

}


.b1{
    font: bold;
    background-color: rgb(220, 207, 228);
    border:0.5px solid balck;
}
</style>
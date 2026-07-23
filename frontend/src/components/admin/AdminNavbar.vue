<template>

<nav class="navbar">

    <h2>Admission Management System</h2>

    <div class="user">

        Welcome, Admin

    </div>

    <button @click="logout">

Logout

</button>

</nav>

</template>

<script setup>

import {useRouter } from "vue-router";

const router = useRouter();

function logout(){
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    router.push("/admin/login");
}





</script>

<style scoped>

.navbar{

    height:70px;

    background:#285a8c;

    color:white;

    display:flex;

    justify-content:space-between;

    align-items:center;

    padding:0 30px;

}

h2{

    margin:0;

}

</style>
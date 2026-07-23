<template>

<nav class="navbar">

    <h2>Student Admission Management System</h2>

    <div class="links">

        <router-link to="/login">Login</router-link>

        <router-link to="/register">Register</router-link>

    </div>

</nav>

</template>

<style scoped>

.navbar{

    display:flex;

    justify-content:space-between;

    align-items:center;

    background:#195bbe;

    color:rgb(0, 0, 0);

    padding:18px;

}

.links{

    display:flex;

    gap:20px;

}

.links a{

    color:white;

    text-decoration:none;

}

</style>
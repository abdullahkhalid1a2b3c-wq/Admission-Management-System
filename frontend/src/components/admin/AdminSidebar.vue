<template>

<div class="sidebar">

    <router-link to="/admin/dashboard">Dashboard</router-link>

    <router-link to="/admin/admissions">Admissions</router-link>

    <!-- <router-link to="/admin/departments">Departments</router-link> -->

    <router-link to="/admin/reports">Reports</router-link>

    <router-link to="/admin/settings">Settings</router-link>

<router-link to="/admin/merit-list">
    Merit List
</router-link>
</div>

</template>

<script setup>

</script>

<style scoped>

.sidebar{

    width:240px;

    min-height:calc(100vh - 70px);

    background:#3b5977;

    display:flex;

    flex-direction:column;

}

a{

    color:white;

    text-decoration:none;

    padding:18px 25px;

}

a:hover{

    background:#2c3e50;

}

.router-link-active{

    background:#1abc9c;

}

</style>
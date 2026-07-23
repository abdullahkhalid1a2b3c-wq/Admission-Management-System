<template>

<div class="sidebar">

<router-link to="/student/dashboard">

Dashboard

</router-link>

<router-link to="/student/apply">

Apply Admission

</router-link>

<router-link to="/student/application">

My Application

</router-link>

<router-link to="/student/profile">

Profile

</router-link>

</div>

</template>

<script setup>

</script>

<style scoped>

.sidebar{

width:230px;

background:#829add;

min-height:100vh;

padding:25px;

display:flex;

flex-direction:column;

gap:18px;

}

a{

color:white;

text-decoration:none;

font-size:18px;

}

.router-link-active{

font-weight:bold;

color:#000000;

}

</style>
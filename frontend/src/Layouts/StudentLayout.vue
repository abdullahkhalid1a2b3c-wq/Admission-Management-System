<template>

<div class="layout">

<StudentNavbar/>

<div class="main">

<StudentSidebar/>

<div class="content">

<router-view/>

</div>

</div>

</div>

</template>

<script setup>

import StudentNavbar from "../components/student/StudentNavbar.vue"

import StudentSidebar from "../components/student/StudentSidebar.vue"

</script>

<style scoped>

.main{

display:flex;

}

.content{

flex:1;

padding:30px;

background:#f4f7fb;

min-height:100vh;

}

</style>
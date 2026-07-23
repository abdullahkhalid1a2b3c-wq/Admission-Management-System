<template>

<div>

    <Navbar />

    <div class="layout">

        <Sidebar />

        <div class="page">

            <router-view />

        </div>

    </div>

</div>

</template>

<script setup>

import Navbar from "../components/Navbar.vue"
import Sidebar from "../components/Sidebar.vue"

</script>

<style scoped>

.layout{

    display:flex;

}

.page{

    flex:1;

    padding:25px;

}

</style>
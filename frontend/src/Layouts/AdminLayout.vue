<template>

<div class="admin-layout">

    <AdminNavbar />

    <div class="main">

        <AdminSidebar />

        <div class="content">

            <router-view />

        </div>

    </div>

</div>

</template>

<script setup>

import AdminNavbar from "../components/admin/AdminNavbar.vue"
import AdminSidebar from "../components/admin/AdminSidebar.vue"

</script>

<style scoped>

.admin-layout{

    min-height:100vh;
    background:#f5f7fa;

}

.main{

    display:flex;

}

.content{

    flex:1;
    padding:30px;

}

</style>
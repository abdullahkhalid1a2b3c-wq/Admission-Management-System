<template>

<div class="recent">

<h2>Recent Applications</h2>

<table>

<thead>

<tr>

<th>Name</th>

<th>Email</th>

<th>Department</th>

<th>Status</th>

</tr>

</thead>

<tbody>

<tr
v-for="application in applications"
:key="application.id"
>

<td>{{ application.fullName }}</td>

<td>{{ application.email }}</td>

<td>{{ application.department }}</td>

<td>{{ application.status }}</td>

</tr>

</tbody>

</table>

</div>

</template>

<script setup>
console.log("RecentApplications Loaded");
import { ref,onMounted } from "vue";

import axios from "axios";

const applications = ref([]);
async function loadRecentApplications() {

    console.log("Fetching Recent Applications");

    try {

        const response = await axios.get(
            "http://localhost:3000/dashboard/recent-applications"
        );

        console.log(response.data);

        applications.value = response.data;

    } catch (error) {

        console.log(error);

    }

}
onMounted(()=>{

    loadRecentApplications();

});

</script>

<style scoped>

.recent{

margin-top:30px;

background:white;

padding:20px;

border-radius:10px;

}

table{

width:100%;

border-collapse:collapse;

}

th,td{

padding:12px;

border-bottom:1px solid #ddd;

text-align:left;

}

</style>
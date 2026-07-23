<template>

<div>

<h1>Merit List</h1>

<table>

<thead>

<tr>

<th>Rank</th>

<th>Name</th>

<th>Department</th>

<th>Merit</th>

<th>Status</th>

</tr>

</thead>

<tbody>

<tr
v-for="(student,index) in students"
:key="student.id"
>

<td>{{ index + 1 }}</td>

<td>{{ student.fullName }}</td>

<td>{{ student.department }}</td>

<td>{{ student.merit }}%</td>

<td>{{ student.status }}</td>

</tr>

</tbody>

</table>

</div>

</template>

<script setup>

import { ref,onMounted } from "vue";
import axios from "axios";

const students = ref([]);

async function loadMeritList(){

    try{

        const response = await axios.get(
            "http://localhost:3000/admissions/merit-list"
        );

        students.value = response.data;

    }

    catch(error){

        console.log(error);

    }

}

onMounted(loadMeritList);

</script>

<style scoped>

table{

width:100%;

border-collapse:collapse;

margin-top:20px;

}

th,td{

padding:12px;

border:1px solid #ddd;

text-align:left;

}

th{

background:#42b883;

color:white;

}

</style>
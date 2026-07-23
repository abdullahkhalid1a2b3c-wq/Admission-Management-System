<template>

<div>

<h1>Student Profile</h1>


<div class="profile-card">

<p>
<b>Name:</b>
{{ student.fullName }}
</p>


<p>
<b>Email:</b>
{{ student.email }}
</p>


<p>
<b>Phone:</b>
{{ student.phone }}
</p>


</div>


</div>

</template>


<script setup>

import { reactive } from "vue";


const student = reactive(

JSON.parse(

localStorage.getItem("student")

)

||
{}

);


</script>


<style scoped>

.profile-card{

background:white;

padding:20px;

width:400px;

border-radius:10px;

}


</style>
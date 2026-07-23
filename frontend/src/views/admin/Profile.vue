<template>

<div>

<h1>Admin Profile</h1>


<div class="box">


<p>
<b>Name:</b>
{{ admin.name }}
</p>


<p>
<b>Email:</b>
{{ admin.email }}
</p>


<p>
<b>Role:</b>
Administrator
</p>


</div>


</div>

</template>


<script setup>


import { reactive } from "vue";


const admin = reactive({

name:"Admin",

email:"admin@gmail.com"


});


</script>


<style scoped>


.box{

background:white;

padding:25px;

border-radius:10px;

width:400px;

}


</style>
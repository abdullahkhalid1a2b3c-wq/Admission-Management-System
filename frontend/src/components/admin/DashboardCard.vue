<template>

<div class="card">

    <h3>{{ title }}</h3>

    <h1>{{ value }}</h1>

</div>

</template>

<script setup>

defineProps({

    title:String,

    value:[String,Number]

})

</script>

<style scoped>

.card{

    background:rgb(165, 196, 199);

    border-radius:10px;

    padding:25px;

    box-shadow:0 2px 10px rgba(0,0,0,.1);

}

h3{

    margin-bottom:10px;

    color:#666;

}

h1{

    color:#1abc9c;

}

</style>
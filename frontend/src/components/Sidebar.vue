<template>

<div class="sidebar">

    <h2>SMS</h2>

    <ul>

        <li>
            <router-link to="/dashboard">
                Dashboard
            </router-link>
        </li>

        <li>
            <router-link to="/admission">
                Admission Form
            </router-link>
        </li>

        <li>
            <router-link to="/applications">
                Applications
            </router-link>
        </li>

        <li>
            <router-link to="/admissions">
                Admission List
            </router-link>
        </li>

         <li>
            <router-link to="/admissions">
                Admission List
            </router-link>
        </li>

    </ul>

</div>

</template>

<script setup>
</script>

<style scoped>

.sidebar{

    width:220px;
    min-height:100vh;
    background:#94b7c7;
    padding:20px;
    box-sizing:border-box;

}

h2{

    margin-bottom:30px;
    text-align:center;

}

ul{

    list-style:none;
    padding:0;
    margin:0;

}

li{

    margin-bottom:15px;

}

a{

    display:block;
    text-decoration:none;
    color:black;
    padding:10px;
    border-radius:6px;

}

a:hover{

    background:#7fa9bb;

}

.router-link-active{

    background:#42b883;
    color:white;
    font-weight:bold;

}

</style>
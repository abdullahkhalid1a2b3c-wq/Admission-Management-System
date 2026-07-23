<template>

<div>

<h1>
Welcome {{ student.fullName }}
</h1>

<p>
Student Admission Dashboard
</p>


<div class="status-card">

<h2>Application Status</h2>

<p v-if="application">

Status:
<span :class="application.status">

{{ application.status }}

</span>

</p>

<p v-else>

No application submitted yet.

</p>

</div>



<div class="cards">


<div class="card">

<h2>Apply Admission</h2>

<p>
Submit your admission application.
</p>

<router-link to="/student/apply">

<button>

Apply Now

</button>

</router-link>

</div>



<div class="card">

<h2>My Application</h2>

<p>
View your submitted application.
</p>

<router-link to="/student/application">

<button>

View Application

</button>

</router-link>

</div>



<div class="card">

<h2>Profile</h2>

<p>
Manage your profile.
</p>

<router-link to="/student/profile">

<button>

Profile

</button>

</router-link>

</div>


</div>

</div>

</template>


<script setup>

import { reactive, ref, onMounted } from "vue";
import axios from "axios";


const student = reactive(

JSON.parse(

localStorage.getItem("student")

)

||

{}

);


const application = ref(null);



async function getApplication(){


const token = localStorage.getItem("token");


try{


const response = await axios.get(

"http://localhost:3000/students/my-application",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);


application.value = response.data;


}

catch(error){

console.log(error);

}


}



onMounted(()=>{

getApplication();

});


</script>



<style scoped>


.cards{

display:grid;

grid-template-columns:repeat(3,1fr);

gap:20px;

margin-top:30px;

}


.card{

background:white;

padding:25px;

border-radius:10px;

box-shadow:0 2px 10px rgba(0,0,0,.1);

}


.status-card{

background:white;

padding:20px;

margin-top:20px;

border-radius:10px;

width:400px;

}


.Pending{

color:orange;

}


.Approved{

color:green;

}


.Rejected{

color:red;

}


button{

margin-top:15px;

padding:10px 18px;

background:#2563eb;

color:white;

border:none;

cursor:pointer;

}


</style>
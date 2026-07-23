<template>

<div>

<h1>Admission List</h1>


<table>

<thead>

<tr>

<th>ID</th>

<th>Name</th>

<th>Email</th>

<th>Department</th>

<th>Merit</th>

<th>Eligibility</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>



<tbody>


<tr
v-for="admission in admissions"
:key="admission.id"
>


<td>
{{ admission.id }}
</td>


<td>
{{ admission.fullName }}
</td>


<td>
{{ admission.email }}
</td>


<td>
{{ admission.department }}
</td>



<td>

{{ admission.merit }}

%

</td>



<td>

<span
:class="admission.eligibility"
>

{{ admission.eligibility }}

</span>


</td>



<td>

{{ admission.status }}

</td>



<td>


<router-link
:to="'/admin/admissions/' + admission.id"
>


<button>

View

</button>


</router-link>



</td>



</tr>


</tbody>


</table>


</div>

</template>



<script setup>


import { ref,onMounted } from "vue"

import axios from "axios"



const admissions = ref([])



async function getAdmissions(){


try{


const response = await axios.get(

"http://localhost:3000/admissions"

)


admissions.value = response.data



}


catch(error){


console.log(error)


}



}





async function updateStatus(id,status){


try{


await axios.put(

`http://localhost:3000/admissions/status/${id}`,

{

status

}

)



getAdmissions()



}


catch(error){


console.log(error)


}


}





onMounted(()=>{


getAdmissions()



})



</script>



<style scoped>


table{


width:100%;

border-collapse:collapse;

margin-top:20px;


}



th,td{


border:1px solid #ddd;

padding:12px;

text-align:left;


}



th{


background:#42b883;

color:white;


}



button{


padding:8px 12px;

margin:3px;

background:#42b883;

color:white;

border:none;

border-radius:5px;

cursor:pointer;


}



button:disabled{


background:#999;

cursor:not-allowed;


}



.Eligible{


color:green;

font-weight:bold;


}



.Not\ Eligible{


color:red;

font-weight:bold;


}



</style>
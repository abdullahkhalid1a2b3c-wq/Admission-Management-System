<template>

<div>

<h1>Admission Reports</h1>


<div class="cards">


<div class="card">

<h3>Total Applications</h3>

<h2>{{ admissionReport.total }}</h2>

</div>



<div class="card">

<h3>Pending</h3>

<h2>{{ admissionReport.pending }}</h2>

</div>



<div class="card">

<h3>Approved</h3>

<h2>{{ admissionReport.approved }}</h2>

</div>



<div class="card">

<h3>Rejected</h3>

<h2>{{ admissionReport.rejected }}</h2>

</div>


</div>



<hr>



<h2>Department Wise Applications</h2>


<table>


<thead>

<tr>

<th>Department</th>

<th>Total Applications</th>

</tr>

</thead>



<tbody>


<tr
v-for="department in departments"
:key="department.department"
>


<td>
{{ department.department }}
</td>


<td>
{{ department.total }}
</td>


</tr>


</tbody>


</table>



<hr>



<h2>Eligibility Report</h2>


<table>


<thead>

<tr>

<th>Eligibility</th>

<th>Total Students</th>

</tr>

</thead>



<tbody>


<tr
v-for="item in eligibility"
:key="item.eligibility"
>


<td>
{{ item.eligibility }}
</td>


<td>
{{ item.total }}
</td>


</tr>


</tbody>


</table>



</div>

</template>



<script setup>


import { ref,onMounted } from "vue";

import axios from "axios";



const admissionReport = ref({

total:0,

pending:0,

approved:0,

rejected:0

});



const departments = ref([]);


const eligibility = ref([]);



async function loadReports(){


try{


const admissionResponse = await axios.get(

"http://localhost:3000/reports/admission"

);



admissionReport.value = admissionResponse.data;



const departmentResponse = await axios.get(

"http://localhost:3000/reports/departments"

);



departments.value = departmentResponse.data;



const eligibilityResponse = await axios.get(

"http://localhost:3000/reports/eligibility"

);



eligibility.value = eligibilityResponse.data;



}


catch(error){


console.log(error);


}


}



onMounted(()=>{


loadReports();


});



</script>



<style scoped>


.cards{


display:grid;

grid-template-columns:repeat(4,1fr);

gap:20px;

margin:30px 0;


}



.card{


background:white;

padding:20px;

border-radius:10px;

box-shadow:0 2px 10px #ddd;


}



table{


width:100%;

border-collapse:collapse;

margin:20px 0;


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



hr{


margin:30px 0;


}


</style>
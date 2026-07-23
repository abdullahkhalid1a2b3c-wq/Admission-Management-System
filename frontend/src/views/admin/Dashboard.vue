<template>

<div>

    <h1>Welcome Admin </h1>

    <p>Admission Management Dashboard </p>

    <div class="cards">


        <DashboardCard
            title="Total Students"
            :value="stats.totalStudents"
        />

            <DashboardCard
            title="Total Applications"
            :value="stats.total"
        />
        
        
        

        <DashboardCard
            title="Pending"
            :value="stats.pending"
        />

        <DashboardCard
            title="Approved"
            :value="stats.approved"
        />

        <DashboardCard
            title="Rejected"
            :value="stats.rejected"
        />

    </div>

    <RecentApplications />

    <QuickActions />

</div>

</template>

<script setup>

import { reactive, onMounted } from "vue";
import axios from "axios";

import DashboardCard from "../../components/admin/DashboardCard.vue";
import RecentApplications from "../../components/admin/RecentApplications.vue";

const stats = reactive({
    totalStudents: 0,
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0

});

async function getDashboardStats() {

    try {

        const response = await axios.get(
            "http://localhost:3000/dashboard"
        );

        console.log(response.data);

        stats.totalStudents = response.data.totalStudents;
        stats.total = response.data.total;
        stats.pending = response.data.pending;
        stats.approved = response.data.approved;
        stats.rejected = response.data.rejected;

    }

    catch (error) {

        console.log(error);

    }

}

onMounted(() => {

    getDashboardStats();

});

</script>

<style scoped>

.cards{

    display:grid;

grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

    gap:20px;

    margin:30px 0;

}

</style>
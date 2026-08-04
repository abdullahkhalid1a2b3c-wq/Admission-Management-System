<template>
  <div class="admin-dashboard-page">
    <div class="page-header">
      <div>
        <h1>Dashboard Overview</h1>
        <p class="page-subtitle">Real-time statistics & admission activity</p>
      </div>
      <div class="header-badge">
        <span>Session 2026</span>
      </div>
    </div>

    <!-- Stats Cards Grid -->
    <div class="stats-grid">
      <DashboardCard title="Total Students" :number="totalStudents" colorClass="indigo">
        <template #icon>
          <span>👥</span>
        </template>
      </DashboardCard>

      <DashboardCard title="Total Applications" :number="totalApplications" colorClass="blue">
        <template #icon>
          <span>📄</span>
        </template>
      </DashboardCard>

      <DashboardCard title="Pending Applications" :number="pendingApplications" colorClass="amber">
        <template #icon>
          <span>⏳</span>
        </template>
      </DashboardCard>

      <DashboardCard title="Approved Applications" :number="approvedApplications" colorClass="emerald">
        <template #icon>
          <span>✓</span>
        </template>
      </DashboardCard>

      <DashboardCard title="Rejected Applications" :number="rejectedApplications" colorClass="rose">
        <template #icon>
          <span>✕</span>
        </template>
      </DashboardCard>
    </div>

    <!-- Recent Applications Table -->
    <RecentApplications />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import DashboardCard from "../../components/admin/DashboardCard.vue";
import RecentApplications from "../../components/admin/RecentApplications.vue";

const totalStudents = ref(0);
const totalApplications = ref(0);
const pendingApplications = ref(0);
const approvedApplications = ref(0);
const rejectedApplications = ref(0);

async function loadStats() {
  const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
  try {
    const baseURL = import.meta.env.VITE_XSTATE_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
    const response = await axios.get(`${baseURL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    totalStudents.value = response.data.totalStudents || 0;
    totalApplications.value = response.data.total || 0;
    pendingApplications.value = response.data.pending || 0;
    approvedApplications.value = response.data.approved || 0;
    rejectedApplications.value = response.data.rejected || 0;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  loadStats();
});
</script>

<style scoped>
.admin-dashboard-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
}

.page-subtitle {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 2px;
}

.header-badge {
  background: #eff6ff;
  color: #2563eb;
  padding: 6px 14px;
  border-radius: 99px;
  font-size: 0.825rem;
  font-weight: 700;
  border: 1px solid #dbeafe;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
</style>
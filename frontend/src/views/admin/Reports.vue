<template>
  <div class="admin-page">
    <div class="page-header">
      <div>
        <h1>Admission Analytics & Reports</h1>
        <p class="page-sub">Comprehensive department and eligibility breakdown</p>
      </div>
      <button class="export-btn" @click="loadReports">
        <span>🔄</span>
        <span>Refresh Data</span>
      </button>
    </div>

    <!-- Overview Metric Cards -->
    <div class="metrics-grid">
      <div class="metric-card blue">
        <span class="m-label">Total Applications</span>
        <span class="m-value">{{ admissionReport.total }}</span>
      </div>
      <div class="metric-card amber">
        <span class="m-label">Pending</span>
        <span class="m-value">{{ admissionReport.pending }}</span>
      </div>
      <div class="metric-card emerald">
        <span class="m-label">Approved</span>
        <span class="m-value">{{ admissionReport.approved }}</span>
      </div>
      <div class="metric-card rose">
        <span class="m-label">Rejected</span>
        <span class="m-value">{{ admissionReport.rejected }}</span>
      </div>
    </div>

    <div class="tables-dual-grid">
      <!-- Department Breakdown Table -->
      <div class="table-card">
        <div class="card-title-bar">
          <h3>Department Wise Applications</h3>
        </div>
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Department Name</th>
                <th>Total Applications</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="dept in departments" :key="dept.department">
                <td class="name-cell">{{ dept.department }}</td>
                <td>
                  <span class="count-pill">{{ dept.total }}</span>
                </td>
              </tr>
              <tr v-if="!departments || departments.length === 0">
                <td colspan="2" class="empty-cell">No department data found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Eligibility Breakdown Table -->
      <div class="table-card">
        <div class="card-title-bar">
          <h3>Eligibility Breakdown</h3>
        </div>
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Eligibility Status</th>
                <th>Total Applicants</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in eligibility" :key="item.eligibility">
                <td>
                  <span class="elig-badge" :class="item.eligibility">
                    {{ item.eligibility }}
                  </span>
                </td>
                <td>
                  <span class="count-pill">{{ item.total }}</span>
                </td>
              </tr>
              <tr v-if="!eligibility || eligibility.length === 0">
                <td colspan="2" class="empty-cell">No eligibility data found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const admissionReport = ref({
  total: 0,
  pending: 0,
  approved: 0,
  rejected: 0
});

const departments = ref([]);
const eligibility = ref([]);

async function loadReports() {
  try {
    const admissionResponse = await axios.get("https://admission-management-system-production-e65e.up.railway.app/reports/admission");
    admissionReport.value = admissionResponse.data;

    const departmentResponse = await axios.get("https://admission-management-system-production-e65e.up.railway.app/reports/departments");
    departments.value = departmentResponse.data;

    const eligibilityResponse = await axios.get("https://admission-management-system-production-e65e.up.railway.app/reports/eligibility");
    eligibility.value = eligibilityResponse.data;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  loadReports();
});
</script>

<style scoped>
.admin-page {
  display: flex;
  flex-direction: column;
  gap: 28px;
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

.page-sub {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 2px;
}

.export-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  color: #334155;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.export-btn:hover {
  background: #f8fafc;
  border-color: #94a3b8;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.metric-card {
  background: #ffffff;
  border-radius: 14px;
  padding: 20px 24px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.metric-card.blue { border-left: 4px solid #2563eb; }
.metric-card.amber { border-left: 4px solid #f59e0b; }
.metric-card.emerald { border-left: 4px solid #10b981; }
.metric-card.rose { border-left: 4px solid #f43f5e; }

.m-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
}

.m-value {
  font-size: 1.8rem;
  font-weight: 800;
  color: #0f172a;
}

.tables-dual-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 24px;
}

.table-card {
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.card-title-bar {
  padding: 18px 24px;
  border-bottom: 1px solid #f1f5f9;
  background: #f8fafc;
}

.card-title-bar h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
}

.table-responsive {
  overflow-x: auto;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.admin-table th {
  background: #ffffff;
  padding: 12px 24px;
  font-size: 0.775rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e2e8f0;
}

.admin-table td {
  padding: 16px 24px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.9rem;
  color: #334155;
}

.name-cell {
  font-weight: 600;
  color: #0f172a;
}

.count-pill {
  display: inline-block;
  background: #f1f5f9;
  color: #0f172a;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 0.85rem;
}

.elig-badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.775rem;
  font-weight: 700;
}

.Eligible { background: #ecfdf5; color: #047857; }
.Not\ Eligible { background: #fef2f2; color: #b91c1c; }

.empty-cell {
  text-align: center;
  padding: 32px !important;
  color: #94a3b8;
}
</style>
<template>
  <div class="admin-page">
    <div class="page-header">
      <div>
        <h1>Merit List</h1>
        <p class="page-sub">Ranked list of applicants based on calculated academic merit</p>
      </div>
      <div class="count-badge">
        Total Candidates: {{ meritList.length }}
      </div>
    </div>

    <div class="table-card">
      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Applicant Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Merit Score</th>
              <th>Eligibility</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in meritList" :key="item.id || index">
              <td class="rank-cell">
                <span class="rank-num" :class="{ 'top-three': index < 3 }">#{{ index + 1 }}</span>
              </td>
              <td class="name-cell">{{ item.fullName }}</td>
              <td>{{ item.email }}</td>
              <td class="dept-cell">{{ item.department }}</td>
              <td>
                <span class="merit-pill">{{ item.merit }}%</span>
              </td>
              <td>
                <span class="elig-badge" :class="item.eligibility">
                  {{ item.eligibility }}
                </span>
              </td>
              <td>
                <span class="status-badge" :class="item.status">
                  {{ item.status }}
                </span>
              </td>
            </tr>
            <tr v-if="!meritList || meritList.length === 0">
              <td colspan="7" class="empty-cell">No merit list entries available.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const meritList = ref([]);

async function getMeritList() {
  try {
    const response = await axios.get("https://admission-management-system-production-e65e.up.railway.app/admissions/merit-list");
    meritList.value = response.data;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getMeritList();
});
</script>

<style scoped>
.admin-page {
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

.page-sub {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 2px;
}

.count-badge {
  background: #eff6ff;
  color: #2563eb;
  padding: 6px 14px;
  border-radius: 99px;
  font-size: 0.85rem;
  font-weight: 700;
  border: 1px solid #dbeafe;
}

.table-card {
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  overflow: hidden;
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
  background: #f8fafc;
  padding: 14px 20px;
  font-size: 0.775rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e2e8f0;
}

.admin-table td {
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.9rem;
  color: #334155;
}

.admin-table tbody tr:hover {
  background: #f8fafc;
}

.rank-num {
  font-weight: 700;
  color: #64748b;
  font-size: 0.875rem;
}

.rank-num.top-three {
  color: #2563eb;
  font-size: 1rem;
}

.name-cell {
  font-weight: 600;
  color: #0f172a;
}

.dept-cell {
  color: #475569;
}

.merit-pill {
  display: inline-block;
  background: #eff6ff;
  color: #1d4ed8;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
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

.status-badge {
  padding: 4px 10px;
  border-radius: 99px;
  font-size: 0.775rem;
  font-weight: 700;
}

.Pending { background: #fffbeb; color: #b45309; }
.Approved { background: #ecfdf5; color: #047857; }
.Rejected { background: #fef2f2; color: #b91c1c; }

.empty-cell {
  text-align: center;
  padding: 40px !important;
  color: #94a3b8;
}
</style>
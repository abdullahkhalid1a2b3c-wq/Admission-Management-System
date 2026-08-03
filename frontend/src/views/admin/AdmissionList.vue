<template>
  <div class="admin-page">
    <div class="page-header">
      <div>
        <h1>Admission Applications</h1>
        <p class="page-sub">Review and process student admission submissions</p>
      </div>
      <div class="count-badge">
        Total: {{ admissions.length }}
      </div>
    </div>

    <div class="table-card">
      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th>App ID</th>
              <th>Applicant Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="adm in admissions" :key="adm.id">
              <td class="id-cell">#ADM-{{ adm.id }}</td>
              <td class="name-cell">{{ adm.fullName }}</td>
              <td>{{ adm.email }}</td>
              <td>{{ adm.phone }}</td>
              <td>{{ adm.department }}</td>
              <td>
                <span class="status-badge" :class="adm.status">
                  <span class="dot"></span>
                  {{ adm.status }}
                </span>
              </td>
              <td>
                <router-link :to="`/admin/admissions/${adm.id}`" class="view-btn">
                  View Details
                </router-link>
              </td>
            </tr>
            <tr v-if="!admissions || admissions.length === 0">
              <td colspan="7" class="empty-cell">No admission applications found.</td>
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

const admissions = ref([]);

async function getAdmissions() {
  try {
    const response = await axios.get("https://admission-management-system-production-e65e.up.railway.app/admissions");
    admissions.value = response.data;
  } catch (error) {
    console.log(error);
  }
}

async function updateStatus(id, status) {
  try {
    await axios.patch(`https://admission-management-system-production-e65e.up.railway.app/admissions/${id}/status`, { status });
    getAdmissions();
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getAdmissions();
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

.id-cell {
  font-weight: 600;
  color: #64748b;
  font-family: monospace;
}

.name-cell {
  font-weight: 600;
  color: #0f172a;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 0.775rem;
  font-weight: 700;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.Pending { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }
.Pending .dot { background: #f59e0b; }

.Approved { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
.Approved .dot { background: #10b981; }

.Rejected { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }
.Rejected .dot { background: #ef4444; }

.view-btn {
  display: inline-block;
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.85rem;
  padding: 6px 14px;
  border-radius: 8px;
  background: #eff6ff;
  border: 1px solid #dbeafe;
  transition: all 0.2s ease;
}

.view-btn:hover {
  background: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
}

.empty-cell {
  text-align: center;
  padding: 40px !important;
  color: #94a3b8;
}
</style>
<template>
  <div class="table-card">
    <div class="table-header-bar">
      <div>
        <h3>Recent Applications</h3>
        <p class="table-sub">Latest student admission submissions</p>
      </div>
      <router-link to="/admin/admissions" class="view-all-link">
        <span>View All</span>
        <span>→</span>
      </router-link>
    </div>

    <div class="table-responsive">
      <table class="admin-table">
        <thead>
          <tr>
            <th>App ID</th>
            <th>Applicant Name</th>
            <th>Department</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="app in applications" :key="app.id">
            <td class="id-cell">#ADM-{{ app.id }}</td>
            <td class="name-cell">{{ app.fullName }}</td>
            <td class="dept-cell">{{ app.department }}</td>
            <td>
              <span class="status-badge" :class="app.status">
                <span class="dot"></span>
                {{ app.status }}
              </span>
            </td>
            <td>
              <router-link :to="`/admin/admissions/${app.id}`" class="action-btn">
                Details
              </router-link>
            </td>
          </tr>
          <tr v-if="!applications || applications.length === 0">
            <td colspan="5" class="empty-cell">No recent applications found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const applications = ref([]);

async function loadRecentApplications() {
    console.log("Fetching Recent Applications");
    try {
        const response = await axios.get(
            "http://localhost:3000/dashboard/recent-applications"
        );
        console.log(response.data);

        applications.value = response.data;

    } catch (error) {

        console.log(error);

    }

}
onMounted(()=>{

    loadRecentApplications();

});

</script>

<style scoped>
.table-card {
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  margin-top: 24px;
}

.table-header-bar {
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-header-bar h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: #0f172a;
}

.table-sub {
  font-size: 0.8rem;
  color: #64748b;
  margin-top: 2px;
}

.view-all-link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #2563eb;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
}

.view-all-link:hover {
  text-decoration: underline;
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

.dept-cell {
  color: #475569;
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

.action-btn {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.85rem;
  padding: 4px 10px;
  border-radius: 6px;
  background: #eff6ff;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #2563eb;
  color: #ffffff;
}

.empty-cell {
  text-align: center;
  padding: 32px !important;
  color: #94a3b8;
}
</style>
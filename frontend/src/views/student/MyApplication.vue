<template>
  <div class="application-view">
    <div v-if="application" class="doc-card">
      <div class="doc-header">
        <div>
          <h1>My Submitted Application</h1>
          <p class="doc-sub">Reference ID: #ADM-{{ application.id || '2026' }}</p>
        </div>
        <div class="status-pill" :class="application.status">
          {{ application.status }}
        </div>
      </div>

      <div class="doc-section">
        <h3 class="section-heading">Applicant Overview</h3>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Full Name</span>
            <span class="detail-val">{{ application.fullName }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Father Name</span>
            <span class="detail-val">{{ application.fatherName }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Email Address</span>
            <span class="detail-val">{{ application.email }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Phone Number</span>
            <span class="detail-val">{{ application.phone }}</span>
          </div>
        </div>
      </div>

      <div class="doc-section">
        <h3 class="section-heading">Admission Choice</h3>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Department</span>
            <span class="detail-val highlight">{{ application.department }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Academic Session</span>
            <span class="detail-val">{{ application.session }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Assigned Campus</span>
            <span class="detail-val">{{ application.campus }}</span>
          </div>
          <div class="detail-item" v-if="application.merit">
            <span class="detail-label">Calculated Merit</span>
            <span class="detail-val highlight">{{ application.merit }}%</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-card">
      <div class="empty-icon">
        <span>📋</span>
      </div>
      <h2>No Admission Submitted Yet</h2>
      <p>You haven't submitted an admission application. Complete your form to track application status.</p>
      <router-link to="/student/apply" class="apply-link-btn">
        Apply For Admission
      </router-link>
    </div>
  </div>
</template>

<script setup>
import axios from "axios"
import { ref, onMounted } from "vue"

const application = ref(null)

async function loadApplication(){
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      "https://admission-management-system-production-e65e.up.railway.app/students/my-application",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    application.value = response.data;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  loadApplication()
})
</script>

<style scoped>
.application-view {
  max-width: 900px;
}

.doc-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 36px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
}

.doc-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 24px;
  border-bottom: 2px solid #f1f5f9;
  margin-bottom: 28px;
}

.doc-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
}

.doc-sub {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 4px;
}

.status-pill {
  padding: 8px 18px;
  border-radius: 99px;
  font-weight: 700;
  font-size: 0.875rem;
}

.Pending { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }
.Approved { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
.Rejected { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }

.doc-section {
  margin-bottom: 28px;
}

.section-heading {
  font-size: 1rem;
  font-weight: 700;
  color: #1e3a8a;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f1f5f9;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (max-width: 600px) {
  .detail-grid { grid-template-columns: 1fr; }
}

.detail-item {
  background: #f8fafc;
  padding: 14px 18px;
  border-radius: 10px;
  border: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-label {
  font-size: 0.775rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.detail-val {
  font-size: 0.95rem;
  font-weight: 600;
  color: #0f172a;
}

.detail-val.highlight {
  color: #2563eb;
  font-weight: 700;
}

.empty-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 60px 40px;
  text-align: center;
  border: 1px solid #e2e8f0;
  max-width: 600px;
  margin: 0 auto;
}

.empty-icon {
  width: 80px;
  height: 80px;
  background: #eff6ff;
  color: #2563eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px auto;
}

.empty-card h2 {
  font-size: 1.35rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
}

.empty-card p {
  font-size: 0.925rem;
  color: #64748b;
  margin-bottom: 24px;
  line-height: 1.5;
}

.apply-link-btn {
  display: inline-block;
  background: #2563eb;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
}

.apply-link-btn:hover {
  background: #1d4ed8;
}
</style>
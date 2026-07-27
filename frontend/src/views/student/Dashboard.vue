<template>
  <div class="dashboard-page">
    <!-- Welcome Header Banner -->
    <div class="welcome-banner">
      <div class="welcome-text">
        <h1>Welcome, {{ student.fullName || 'Student' }}!</h1>
        <p>Student Admission Portal • Session 2026</p>
      </div>
      <div class="banner-badge">
        <span>Academic Year 2026-2027</span>
      </div>
    </div>

    <!-- Application Status Section -->
    <div class="status-section">
      <div class="status-card">
        <div class="status-card-header">
          <div class="status-icon-box">
            <span>📄</span>
          </div>
          <div>
            <h3>Application Status</h3>
            <p class="status-subtitle">Real-time status of your admission submission</p>
          </div>
        </div>

        <div class="status-card-body">
          <div v-if="application" class="status-detail">
            <span class="status-label">Current Status:</span>
            <span class="status-badge" :class="application.status">
              <span class="status-dot"></span>
              {{ application.status }}
            </span>
          </div>
          <div v-else class="empty-status">
            <span>ℹ</span>
            <span>No application submitted yet. Get started by clicking Apply Admission below.</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Navigation Cards -->
    <div class="cards-grid">
      <!-- Card 1: Apply Admission -->
      <div class="dash-card">
        <div class="card-icon-wrapper icon-blue">
          <span>📝</span>
        </div>
        <h2 class="card-title">Apply Admission</h2>
        <p class="card-desc">Submit your admission application and provide academic details.</p>
        <router-link to="/student/apply" class="card-action-btn btn-blue">
          <span>Apply Now</span>
          <span>→</span>
        </router-link>
      </div>

      <!-- Card 2: My Application -->
      <div class="dash-card">
        <div class="card-icon-wrapper icon-emerald">
          <span>📋</span>
        </div>
        <h2 class="card-title">My Application</h2>
        <p class="card-desc">Track your admission progress and approval status.</p>
        <router-link to="/student/application" class="card-action-btn btn-emerald">
          <span>View Application</span>
          <span>→</span>
        </router-link>
      </div>

      <!-- Card 3: Profile -->
      <div class="dash-card">
        <div class="card-icon-wrapper icon-purple">
          <span>👤</span>
        </div>
        <h2 class="card-title">Profile</h2>
        <p class="card-desc">Manage your personal information.</p>
        <router-link to="/student/profile" class="card-action-btn btn-purple">
          <span>View Profile</span>
          <span>→</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";

const student = reactive(
  JSON.parse(localStorage.getItem("student")) || {}
);

const application = ref(null);

async function getApplication() {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      "http://localhost:3000/students/my-application",
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
  getApplication();
});
</script>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.welcome-banner {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  color: #ffffff;
  padding: 32px 36px;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 25px -5px rgba(30, 58, 138, 0.2);
}

.welcome-text h1 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 6px;
  letter-spacing: -0.02em;
}

.welcome-text p {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.85);
}

.banner-badge {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 99px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  font-size: 0.85rem;
  font-weight: 600;
}

.status-section {
  width: 100%;
}

.status-card {
  background: #ffffff;
  border-radius: 14px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.status-card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
  padding-bottom: 14px;
  border-bottom: 1px solid #f1f5f9;
}

.status-icon-box {
  width: 44px;
  height: 44px;
  background: #eff6ff;
  color: #2563eb;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-card-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
}

.status-subtitle {
  font-size: 0.85rem;
  color: #64748b;
}

.status-detail {
  display: flex;
  align-items: center;
  gap: 16px;
}

.status-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #334155;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 99px;
  font-size: 0.9rem;
  font-weight: 700;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.Pending {
  background: #fffbeb;
  color: #b45309;
  border: 1px solid #fde68a;
}
.Pending .status-dot { background: #f59e0b; }

.Approved {
  background: #ecfdf5;
  color: #047857;
  border: 1px solid #a7f3d0;
}
.Approved .status-dot { background: #10b981; }

.Rejected {
  background: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fecaca;
}
.Rejected .status-dot { background: #ef4444; }

.empty-status {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #64748b;
  font-size: 0.9rem;
  background: #f8fafc;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #f1f5f9;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.dash-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 28px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  transition: all 0.25 ease;
}

.dash-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(30, 58, 138, 0.08);
  border-color: #cbd5e1;
}

.card-icon-wrapper {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.icon-blue { background: #eff6ff; color: #2563eb; }
.icon-emerald { background: #ecfdf5; color: #059669; }
.icon-purple { background: #faf5ff; color: #7c3aed; }

.card-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
}

.card-desc {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 24px;
  flex: 1;
}

.card-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.925rem;
  transition: all 0.2s ease;
}

.btn-blue {
  background: #2563eb;
  color: #ffffff;
}
.btn-blue:hover {
  background: #1d4ed8;
}

.btn-emerald {
  background: #059669;
  color: #ffffff;
}
.btn-emerald:hover {
  background: #047857;
}

.btn-purple {
  background: #7c3aed;
  color: #ffffff;
}
.btn-purple:hover {
  background: #6d28d9;
}

@media (max-width: 768px) {
  .welcome-banner {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}
</style>
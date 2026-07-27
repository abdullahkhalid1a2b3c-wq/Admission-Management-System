<template>
  <div class="profile-page">
    <div class="profile-card">
      <div class="profile-header">
        <div class="avatar-box">
          {{ (student.fullName || 'S').charAt(0).toUpperCase() }}
        </div>
        <div class="header-text">
          <h2>{{ student.fullName || 'Student Name' }}</h2>
          <span class="role-badge">Registered Applicant</span>
        </div>
      </div>

      <div class="profile-body">
        <h3 class="section-title">Account Details</h3>

        <div class="info-row">
          <div class="info-icon">
            <span>👤</span>
          </div>
          <div class="info-content">
            <span class="info-label">Full Name</span>
            <span class="info-val">{{ student.fullName || 'N/A' }}</span>
          </div>
        </div>

        <div class="info-row">
          <div class="info-icon">
            <span>✉</span>
          </div>
          <div class="info-content">
            <span class="info-label">Email Address</span>
            <span class="info-val">{{ student.email || 'N/A' }}</span>
          </div>
        </div>

        <div class="info-row">
          <div class="info-icon">
            <span>📞</span>
          </div>
          <div class="info-content">
            <span class="info-label">Phone Number</span>
            <span class="info-val">{{ student.phone || 'N/A' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const student = reactive(
  JSON.parse(localStorage.getItem("student")) || {}
);
</script>

<style scoped>
.profile-page {
  max-width: 540px;
}

.profile-card {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
  overflow: hidden;
}

.profile-header {
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  padding: 32px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  color: #ffffff;
}

.avatar-box {
  width: 64px;
  height: 64px;
  background: #ffffff;
  color: #1e3a8a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 800;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.header-text h2 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.role-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 0.775rem;
  font-weight: 600;
}

.profile-body {
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding-bottom: 8px;
  border-bottom: 1px dashed #e2e8f0;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid #f1f5f9;
}

.info-icon {
  width: 36px;
  height: 36px;
  background: #eff6ff;
  color: #2563eb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-content {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
}

.info-val {
  font-size: 0.95rem;
  color: #0f172a;
  font-weight: 600;
}
</style>
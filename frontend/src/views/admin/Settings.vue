<template>
  <div class="admin-page">
    <div class="page-header">
      <div>
        <h1>System Settings</h1>
        <p class="page-sub">Configure portal preferences and admission session controls</p>
      </div>
    </div>

    <div class="settings-card">
      <div class="section-header">
        <div class="icon-wrap">
          <span>⚙️</span>
        </div>
        <div>
          <h3>General Configuration</h3>
          <p>Manage active admission session & portal details</p>
        </div>
      </div>

      <div class="form-grid">
        <div class="form-item">
          <label>Portal Version</label>
          <input type="text" value="v1.0.0 (Latest)" readonly class="read-only-input" />
        </div>

        <div class="form-item">
          <label>Current Admission Session</label>
          <input type="text" value="2026 - Spring" class="std-input" />
        </div>

        <div class="form-item">
          <label>Academic Year</label>
          <input type="text" value="2025 - 2026" class="std-input" />
        </div>

        <div class="form-item">
          <label>System Mode</label>
          <input type="text" value="Active Admissions Open" readonly class="read-only-input active" />
        </div>
      </div>

      <div class="save-bar">
        <span v-if="savedMessage" class="save-notice">✓ {{ savedMessage }}</span>
        <button class="save-btn" @click="saveNotice">
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const savedMessage = ref("");

function saveNotice() {
  savedMessage.value = "System Settings saved successfully!";
  setTimeout(() => {
    savedMessage.value = "";
  }, 3000);
}
</script>

<style scoped>
.admin-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 800px;
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

.settings-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f1f5f9;
  margin-bottom: 24px;
}

.icon-wrap {
  width: 44px;
  height: 44px;
  background: #eff6ff;
  color: #2563eb;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
}

.section-header p {
  font-size: 0.825rem;
  color: #64748b;
  margin-top: 2px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-item label {
  font-size: 0.8rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.std-input, .read-only-input {
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-size: 0.925rem;
  color: #0f172a;
  outline: none;
  transition: all 0.2s ease;
}

.std-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.read-only-input {
  background: #f8fafc;
  color: #64748b;
}

.read-only-input.active {
  color: #059669;
  font-weight: 600;
}

.save-bar {
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
}

.save-notice {
  font-size: 0.875rem;
  color: #059669;
  font-weight: 600;
}

.save-btn {
  background: #2563eb;
  color: #ffffff;
  border: none;
  font-weight: 600;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.save-btn:hover {
  background: #1d4ed8;
}
</style>
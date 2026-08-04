<template>
  <div class="details-page">
    <!-- Top Bar with Back Link -->
    <div class="top-nav">
      <router-link to="/admin/admissions" class="back-link">
        <span>←</span>
        <span>Back to Admissions</span>
      </router-link>
    </div>

    <div v-if="application" class="details-card">
      <div class="card-header-bar">
        <div>
          <h1>Application Details</h1>
          <p class="app-id-tag">Reference ID: #ADM-{{ application.id }}</p>
        </div>

        <div class="header-right">
          <span class="status-badge" :class="application.status">
            {{ application.status }}
          </span>
        </div>
      </div>

      <!-- Personal Info Section -->
      <div class="detail-section">
        <h3 class="section-title">Personal Information</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Full Name</span>
            <span class="val">{{ application.fullName }}</span>
          </div>
          <div class="info-item">
            <span class="label">Father Name</span>
            <span class="val">{{ application.fatherName }}</span>
          </div>
          <div class="info-item">
            <span class="label">Gender</span>
            <span class="val">{{ application.gender }}</span>
          </div>
          <div class="info-item">
            <span class="label">Date of Birth</span>
            <span class="val">{{ application.dob }}</span>
          </div>
          <div class="info-item">
            <span class="label">Email Address</span>
            <span class="val">{{ application.email }}</span>
          </div>
          <div class="info-item">
            <span class="label">Phone Number</span>
            <span class="val">{{ application.phone }}</span>
          </div>
        </div>
      </div>

      <!-- Academic Info Section -->
      <div class="detail-section">
        <h3 class="section-title">Academic Records</h3>
        <div class="academic-sub">
          <h4>Matric / SSC Record</h4>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">Matric Board</span>
              <span class="val">{{ application.matricBoard }}</span>
            </div>
            <div class="info-item">
              <span class="label">Roll Number</span>
              <span class="val">{{ application.matricRollNo }}</span>
            </div>
            <div class="info-item">
              <span class="label">Obtained / Total</span>
              <span class="val">{{ application.matricObtainedMarks }} / {{ application.matricTotalMarks }}</span>
            </div>
          </div>

          <h4 style="margin-top: 16px;">FSc / HSSC Record</h4>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">FSc Board</span>
              <span class="val">{{ application.fscBoard }}</span>
            </div>
            <div class="info-item">
              <span class="label">Roll Number</span>
              <span class="val">{{ application.fscRollNo }}</span>
            </div>
            <div class="info-item">
              <span class="label">Obtained / Total</span>
              <span class="val">{{ application.fscObtainedMarks }} / {{ application.fscTotalMarks }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Eligibility Information Section -->
      <div class="detail-section">
        <h3 class="section-title">Eligibility Information</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Matric Percentage</span>
            <span class="val">{{ application.matricPercentage }}%</span>
          </div>
          <div class="info-item">
            <span class="label">FSc Percentage</span>
            <span class="val">{{ application.fscPercentage }}%</span>
          </div>
          <div class="info-item">
            <span class="label">Merit</span>
            <span class="val highlight">{{ application.merit }}%</span>
          </div>
          <div class="info-item">
            <span class="label">Eligibility</span>
            <span class="val elig-status" :class="application.eligibility === 'Eligible' ? 'eligible' : 'not-eligible'">
              {{ application.eligibility }}
            </span>
          </div>
        </div>
      </div>

      <!-- Admission Choice -->
      <div class="detail-section">
        <h3 class="section-title">Admission Choice</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">Department</span>
            <span class="val highlight">{{ application.department }}</span>
          </div>
          <div class="info-item">
            <span class="label">Academic Session</span>
            <span class="val">{{ application.session }}</span>
          </div>
          <div class="info-item">
            <span class="label">Campus</span>
            <span class="val">{{ application.campus }}</span>
          </div>
        </div>
      </div>

      <!-- Admin Actions Bar -->
      <div class="action-footer">
        <span class="action-label">Change Status:</span>
        <div class="btn-group">
          <button 
            @click="updateStatus('Approved')" 
            class="action-btn approve-btn" 
            :disabled="application.status === 'Approved'"
          >
            <span>✓</span>
            Approve Application
          </button>
          
          <button 
            @click="updateStatus('Rejected')" 
            class="action-btn reject-btn"
            :disabled="application.status === 'Rejected'"
          >
            <span>✕</span>
            Reject Application
          </button>
        </div>
      </div>
    </div>

    <div v-else class="loading-state">
      <span>Loading application details...</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const application = ref(null);

async function getAdmissionDetails() {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
    try {
        const baseURL = import.meta.env.VITE_XSTATE_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
        const response = await axios.get(
            `${baseURL}/admissions/${route.params.id}`,
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

async function updateStatus(status) {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
    const baseURL = import.meta.env.VITE_XSTATE_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
    try {
        if (status === "Approved") {
            await axios.post(
                `${baseURL}/admissions/approve`,
                {
                    id: route.params.id,
                    action: "APPROVE"
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        } else {
            await axios.post(
                `${baseURL}/admissions/reject`,
                {
                    id: route.params.id,
                    action: "REJECT"
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        }

        // Refresh application details
        await getAdmissionDetails();

        // Go back to list   
        router.push("/admin/admissions");
    } catch (error) {
        console.log(error);
    }
}

onMounted(() => {

    getAdmissionDetails();

});
</script>
<style scoped>
.details-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1000px;
}

.top-nav {
  display: flex;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #2563eb;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.details-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
}

.card-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 20px;
  border-bottom: 2px solid #f1f5f9;
  margin-bottom: 24px;
}

.card-header-bar h1 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #0f172a;
}

.app-id-tag {
  font-size: 0.85rem;
  color: #64748b;
  margin-top: 4px;
  font-family: monospace;
}

.status-badge {
  padding: 6px 16px;
  border-radius: 99px;
  font-weight: 700;
  font-size: 0.85rem;
}

.Pending { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }
.Approved { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
.Rejected { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }

.detail-section {
  margin-bottom: 28px;
}

.section-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1e3a8a;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 16px;
  padding-bottom: 6px;
  border-bottom: 1px solid #f1f5f9;
}

.academic-sub h4 {
  font-size: 0.85rem;
  font-weight: 700;
  color: #3b82f6;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.info-item {
  background: #f8fafc;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
}

.val {
  font-size: 0.925rem;
  font-weight: 600;
  color: #0f172a;
}

.val.highlight {
  color: #2563eb;
  font-weight: 700;
}

.elig-status.eligible {
  color: #059669;
  font-weight: 700;
}

.elig-status.not-eligible {
  color: #dc2626;
  font-weight: 700;
}

.action-footer {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 2px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.action-label {
  font-size: 0.9rem;
  font-weight: 700;
  color: #334155;
}

.btn-group {
  display: flex;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.approve-btn {
  background: #059669;
  color: #ffffff;
}

.approve-btn:hover:not(:disabled) {
  background: #047857;
}

.reject-btn {
  background: #dc2626;
  color: #ffffff;
}

.reject-btn:hover:not(:disabled) {
  background: #b91c1c;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading-state {
  padding: 40px;
  text-align: center;
  color: #64748b;
}
</style>
<template>
  <div class="form-container">
    <div class="form-header">
      <h2>Undergraduate Admission Application</h2>
      <p>Please fill in all personal, academic, and program choices accurately.</p>
    </div>

    <!-- Status Banners -->
    <div v-if="successMessage" class="success-banner">
      <span>✓ {{ successMessage }}</span>
    </div>
    <div v-if="errorMessage" class="error-banner">
      <span>⚠️ {{ errorMessage }}</span>
    </div>

    <form @submit.prevent="submitApplication" class="admission-form">
      <!-- Section 1: Personal Information -->
      <div class="form-card">
        <div class="section-title">
          <div class="section-icon">
            <span>👤</span>
          </div>
          <h2>Personal Information</h2>
        </div>

        <div class="grid-2">
          <div class="form-field">
            <label>Full Name</label>
            <input type="text" v-model="application.fullName" placeholder="Full legal name" required />
          </div>

          <div class="form-field">
            <label>Father Name</label>
            <input type="text" v-model="application.fatherName" placeholder="Father's full name" required />
          </div>

          <div class="form-field">
            <label>Gender</label>
            <select v-model="application.gender" required>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div class="form-field">
            <label>Date of Birth</label>
            <input type="date" v-model="application.dob" required />
          </div>

          <div class="form-field">
            <label>Email Address</label>
            <input type="email" v-model="application.email" placeholder="example@domain.com" required />
          </div>

          <div class="form-field">
            <label>Phone Number</label>
            <input type="text" v-model="application.phone" placeholder="+92 300 0000000" required />
          </div>
        </div>
      </div>

      <!-- Section 2: Academic Information -->
      <div class="form-card">
        <div class="section-title">
          <div class="section-icon">
            <span>🎓</span>
          </div>
          <h2>Academic Information</h2>
        </div>

        <h3 class="sub-header">Matric / SSC Details</h3>
        <div class="grid-2">
          <div class="form-field">
            <label>Matric Board</label>
            <input type="text" v-model="application.matricBoard" placeholder="e.g. BISE Lahore" required />
          </div>

          <div class="form-field">
            <label>Matric Roll No</label>
            <input type="text" v-model="application.matricRollNo" placeholder="Roll number" required />
          </div>

          <div class="form-field">
            <label>Matric Total Marks</label>
            <input type="number" v-model="application.matricTotalMarks" placeholder="1100" required />
          </div>

          <div class="form-field">
            <label>Matric Obtained Marks</label>
            <input type="number" v-model="application.matricObtainedMarks" placeholder="e.g. 980" required />
          </div>
        </div>

        <h3 class="sub-header" style="margin-top: 24px;">FSc / HSSC Details</h3>
        <div class="grid-2">
          <div class="form-field">
            <label>FSc Board</label>
            <input type="text" v-model="application.fscBoard" placeholder="e.g FBISE" required />
          </div>

          <div class="form-field">
            <label>FSc Roll No</label>
            <input type="text" v-model="application.fscRollNo" placeholder="Roll number" required />
          </div>

          <div class="form-field">
            <label>FSc Total Marks</label>
            <input type="number" v-model="application.fscTotalMarks" placeholder="1100" required />
          </div>

          <div class="form-field">
            <label>FSc Obtained Marks</label>
            <input type="number" v-model="application.fscObtainedMarks" placeholder="e.g. 950" required />
          </div>
        </div>
      </div>

      <!-- Section 3: Admission Preference -->
      <div class="form-card">
        <div class="section-title">
          <div class="section-icon">
            <span>🏫</span>
          </div>
          <h2>Admission Preferences</h2>
        </div>

        <div class="grid-3">
          <div class="form-field">
            <label>Department / Program</label>
            <select v-model="application.department" required>
              <option value="">Select Department</option>
              <option>Computer Science</option>
              <option>Software Engineering</option>
              <option>Information Technology</option>
              <option>Artificial Intelligence</option>
              <option>Electrical Enginering</option>
              <option>Mechanical Enginering</option>
              <option>Mechatronics Enginering</option>
              <option>Aerospace Enginering</option>
              <option>Chemical Enginering</option>
              <option>Business Administration</option>
            </select>
          </div>

          <div class="form-field">
            <label>Session</label>
            <input type="text" v-model="application.session" placeholder="e.g. Fall 2026" required />
          </div>

          <div class="form-field">
            <label>Campus</label>
            <input type="text" v-model="application.campus" placeholder="e.g. Main Campus" required />
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="submit-form-btn">
          <span>💾</span>
          <span>Submit Admission Application</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const student = JSON.parse(
    localStorage.getItem("student")
) || {};

const successMessage = ref("");
const errorMessage = ref("");

const application = reactive({
    student_id: student.id,
    fullName: student.fullName || "",
    fatherName: "",
    gender: "",
    dob: "",
    email: student.email || "",
    phone: student.phone || "",

    // Academic Information
    matricBoard: "",
    matricRollNo: "",
    matricTotalMarks: "",
    matricObtainedMarks: "",

    fscBoard: "",
    fscRollNo: "",
    fscTotalMarks: "",
    fscObtainedMarks: "",

    // Admission Information
    department: "",
    session: "Fall 2026",
    campus: "Main Campus"
});

async function submitApplication() {
  successMessage.value = "";
  errorMessage.value = "";
  try {
    const response = await axios.post(
      "https://admission-management-system-production-e65e.up.railway.app/admissions",
      application
    );
    successMessage.value = "Admission Submitted Successfully!";
    setTimeout(() => {
      router.push("/student/application");
    }, 1200);
  } catch (error) {
    console.log(error);
    errorMessage.value = "Failed to submit admission application.";
  }
}
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-header {
  background: #ffffff;
  padding: 24px 30px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}

.form-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
}

.form-header p {
  font-size: 0.9rem;
  color: #64748b;
}

.admission-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-card {
  background: #ffffff;
  border-radius: 14px;
  padding: 28px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f1f5f9;
}

.section-icon {
  width: 36px;
  height: 36px;
  background: #eff6ff;
  color: #2563eb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-title h2 {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
}

.sub-header {
  font-size: 0.925rem;
  font-weight: 700;
  color: #3b82f6;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 14px;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 768px) {
  .grid-2, .grid-3 {
    grid-template-columns: 1fr;
  }
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-field label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
}

input, select {
  width: 100%;
  padding: 11px 14px;
  border: 1.5px solid #cbd5e1;
  border-radius: 9px;
  font-size: 0.925rem;
  color: #0f172a;
  background: #ffffff;
  transition: all 0.2s ease;
}

input:focus, select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.submit-form-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  color: #ffffff;
  border: none;
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
  transition: all 0.2s ease;
}

.submit-form-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.35);
}

.success-banner {
  background: #f0fdf4;
  color: #166534;
  border: 1px solid #bbf7d0;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
}

.error-banner {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
}
</style>
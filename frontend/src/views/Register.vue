<template>
  <div class="auth-card">
    <!-- Welcome Banner Section -->
    <div class="welcome-header">
      <div class="welcome-icon">
        <span class="icon-sym">👤</span>
      </div>
      <h1 class="welcome-title">Student Registration</h1>
      <p class="welcome-subtitle">Create your account to start your university admission application.</p>
    </div>

    <!-- Status Banners -->
    <div v-if="successMessage" class="success-banner">
      <span>✓ {{ successMessage }}</span>
    </div>
    <div v-if="errorMessage" class="error-banner">
      <span>⚠️ {{ errorMessage }}</span>
    </div>

    <!-- Registration Form -->
    <form @submit.prevent="registerStudent" class="auth-form">
      <div class="form-grid">
        <div class="form-group">
          <label for="fullName">Full Name</label>
          <div class="input-wrapper">
            <span class="input-icon">👤</span>
            <input
              id="fullName"
              type="text"
              v-model="student.fullName"
              placeholder="Abdullah Khalid"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <div class="input-wrapper">
            <span class="input-icon">✉</span>
            <input
              id="email"
              type="email"
              v-model="student.email"
              placeholder="abdullahKhalid@gmail.com"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="input-wrapper">
            <span class="input-icon">🔒</span>
            <input
              id="password"
              type="password"
              v-model="student.password"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="phone">Phone Number</label>
          <div class="input-wrapper">
            <span class="input-icon">📞</span>
            <input
              id="phone"
              type="text"
              v-model="student.phone"
              placeholder="+92 300 1234567"
              required
            />
          </div>
        </div>
      </div>

      <button type="submit" class="submit-btn">
        <span>Create Account</span>
        <span class="btn-arrow">→</span>
      </button>
    </form>

    <div class="auth-footer">
      <p>Already registered? <router-link to="/student/login">Login to your account</router-link></p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"

const router = useRouter()

const student = reactive({
  fullName:"",
  email:"",
  password:"",
  phone:""
})

const successMessage = ref("")
const errorMessage = ref("")

async function registerStudent(){
  successMessage.value = ""
  errorMessage.value = ""
  try{
    const response = await axios.post(
      "https://admission-management-system-production-e65e.up.railway.app/students/register",
      student
    )
    successMessage.value = response.data.message || "Registration Successful! Redirecting to login..."
    student.fullName=""
    student.email=""
    student.password=""
    student.phone=""
    setTimeout(() => {
      router.push("/student/login")
    }, 1500)
  }
  catch(error){
    console.log(error)
    errorMessage.value = "Registration Failed"
  }
}
</script>

<style scoped>
.auth-card {
  background: #e0e5ea;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(30, 58, 138, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 40px;
  border: 1px solid #010204;
  width: 100%;
}

.welcome-header {
  text-align: center;
  margin-bottom: 32px;
}

.welcome-icon {
  width: 56px;
  height: 56px;
  background: #f3f4f5;
  color: #2563eb;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px auto;
  border: 1px solid #dedfe1;
}

.welcome-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
  letter-spacing: -0.01em;
}

.welcome-subtitle {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.4;
  max-width: 460px;
  margin: 0 auto;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  color: #94a3b8;
  pointer-events: none;
}

input {
  width: 100%;
  padding: 12px 14px 12px 42px;
  border: 1.5px solid #cbd5e1;
  border-radius: 10px;
  font-size: 0.95rem;
  color: #0f172a;
  background: #ffffff;
  transition: all 0.2s ease;
}

input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
  transition: all 0.2s ease;
}

.submit-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.35);
}

.success-banner {
  background: #f0fdf4;
  color: #166534;
  border: 1px solid #bbf7d0;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 20px;
  text-align: center;
}

.error-banner {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 20px;
  text-align: center;
}

.auth-footer {
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid #f1f5f9;
  text-align: center;
}

.auth-footer p {
  font-size: 0.9rem;
  color: #64748b;
}

.auth-footer a {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
}

.auth-footer a:hover {
  text-decoration: underline;
}
</style>
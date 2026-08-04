<template>
  <div class="auth-card">
    <!-- Clean Welcome Section -->
    <div class="welcome-header">
      <div class="welcome-icon">
        <span class="icon-sym">🎓</span>
      </div>
      <h1 class="welcome-title">Welcome to Student Admission Portal</h1>
      <p class="welcome-subtitle">Apply for admission, track application status, and manage your profile.</p>
    </div>

    <!-- Error Banner -->
    <div v-if="errorMessage" class="error-banner">
      <span>⚠️ {{ errorMessage }}</span>
    </div>

    <!-- Login Form -->
    <form @submit.prevent="loginStudent" class="auth-form">
      <div class="form-group">
        <label for="email">Email Address</label>
        <div class="input-wrapper">
          <span class="input-icon">✉</span>
          <input
            id="email"
            type="email"
            v-model="login.email"
            placeholder="student@example.com"
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
            v-model="login.password"
            placeholder="••••••••"
            required
          />
        </div>
      </div>

    <button
      type="submit"
      class="submit-btn"
      :disabled="isLoading"
    >
      <span v-if="isLoading">
        Logging In...
      </span>

      <span v-else>
        Login to Portal
      </span>

      <span class="btn-arrow">→</span>
    </button>
    </form>

    <div class="auth-footer">
      <p>Don't have an account yet? <router-link to="/student/register">Register for Admission</router-link></p>

      <div class="admin-portal-link">
        <span class="admin-label">Administrator?</span>
        <router-link to="/admin/login" class="admin-link">Login as Admin</router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const login = reactive({

  email: "",

  password: ""

});

const errorMessage = ref("");

const isLoading = ref(false);

async function loginStudent() {

  errorMessage.value = "";

  isLoading.value = true;

  try {

    const baseURL = import.meta.env.VITE_XSTATE_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
    const response = await axios.post(
      `${baseURL}/login`,
      {
        email: login.email,
        password: login.password
      }
    );

    // Save Login Data
    localStorage.setItem(

      "token",

      response.data.token

    );

    localStorage.setItem(

      "student",

      JSON.stringify(response.data.student)

    );

    // Go to Dashboard
    router.push("/student/dashboard");

  }

  catch (err) {

    errorMessage.value =

      err.response?.data?.message ||

      "Invalid Email or Password";

  }

  finally {

    isLoading.value = false;

  }

}
</script>


<style scoped>
.auth-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(30, 58, 138, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 40px;
  border: 1px solid #e2e8f0;
  width: 100%;
}

.welcome-header {
  text-align: center;
  margin-bottom: 32px;
}

.welcome-icon {
  width: 56px;
  height: 56px;
  background: #eff6ff;
  color: #2563eb;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px auto;
  border: 1px solid #dbeafe;
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
  max-width: 440px;
  margin: 0 auto;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.auth-footer p {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
}

.auth-footer a {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
}

.auth-footer a:hover {
  text-decoration: underline;
}

.admin-portal-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding-top: 10px;
  border-top: 1px dashed #e2e8f0;
  font-size: 0.85rem;
}

.admin-label {
  color: #64748b;
}

.admin-link {
  color: #1e3a8a !important;
  font-weight: 700 !important;
  text-decoration: none;
}

.admin-link:hover {
  text-decoration: underline !important;
}


.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}


</style>
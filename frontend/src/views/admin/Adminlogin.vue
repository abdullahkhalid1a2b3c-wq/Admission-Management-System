<template>
  <div class="admin-login-card">
    <div class="header">
      <div class="admin-icon-shield">
        <span>🛡️</span>
      </div>
      <h1>Administrator Portal</h1>
      <p>Authorized Personnel Login</p>
    </div>

    <div v-if="errorMessage" class="error-banner">
      <span>⚠️ {{ errorMessage }}</span>
    </div>

    <form @submit.prevent="loginAdmin" class="login-form">
      <div class="form-group">
        <label for="admin-email">Email Address</label>
        <input
          id="admin-email"
          type="email"
          v-model="login.email"
          placeholder="admin1@gmail.com"
          required
        />
      </div>

      <div class="form-group">
        <label for="admin-pass">Password</label>
        <input
          id="admin-pass"
          type="password"
          v-model="login.password"
          placeholder="••••••••"
          required
        />
      </div>

      <button type="submit" class="admin-login-btn">
        Login to Dashboard
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const login = reactive({
  email: "",
  password: ""
});

const errorMessage = ref("");

async function loginAdmin() {
  errorMessage.value = "";
  try {
    const response = await axios.post("http://localhost:https://admission-management-system-production-e65e.up.railway.app/admin/login", login);
    localStorage.setItem("adminToken", response.data.token);
    router.push("/admin/dashboard");
  } catch (error) {
    console.log(error);
    errorMessage.value = "Invalid Email or Password";
  }
}
</script>

<style scoped>
.error-banner {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 18px;
  text-align: center;
}

.admin-login-card {
  background: #90979a;
  border: 1px solid #fcfcfd;
  border-radius: 12px;
  padding: 36px 32px;
  width: 100%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.header {
  text-align: center;
  margin-bottom: 28px;
}

.admin-icon-shield {
  width: 48px;
  height: 48px;
  background: #2e568b;
  color: #2563eb;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px auto;
}

.header h1 {
  font-size: 1.35rem;
  font-weight: 700;
  color: #121c32;
  margin-bottom: 4px;
}

.header p {
  font-size: 0.85rem;
  color: #64748b;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

input {
  width: 100%;
  padding: 10px 14px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  color: #0f172a;
  font-size: 0.925rem;
  outline: none;
  transition: all 0.2s ease;
}

input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.admin-login-btn {
  padding: 12px;
  background: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s ease;
}

.admin-login-btn:hover {
  background: #1d4ed8;
}
</style>
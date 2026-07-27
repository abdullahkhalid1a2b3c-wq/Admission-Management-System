<template>
  <header class="navbar-header">
    <div class="navbar-container">
      <div class="brand">
        <div class="brand-logo">
          <span>🎓</span>
        </div>
        <div class="brand-info">
          <span class="brand-title">University Portal</span>
          <span class="brand-subtitle">Student Admission System</span>
        </div>
      </div>

      <!-- Before Authentication Navigation -->
      <div v-if="!isLoggedIn" class="nav-actions">
        <router-link to="/student/login" class="nav-btn btn-ghost" active-class="active-btn">
          Login
        </router-link>
        <router-link to="/student/register" class="nav-btn btn-primary" active-class="active-btn">
          Register
        </router-link>
      </div>

      <!-- After Authentication User Profile & Logout -->
      <div v-else class="user-actions">
        <div class="user-badge" v-if="studentName">
          <div class="avatar">{{ studentName.charAt(0).toUpperCase() }}</div>
          <div class="user-details">
            <span class="user-name">{{ studentName }}</span>
            <span class="user-role">Applicant</span>
          </div>
        </div>

        <button class="logout-btn" @click="logout" title="Sign out of your account">
          <span>🚪</span> Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const isLoggedIn = ref(!!localStorage.getItem("token"));
const studentName = ref("");

function updateState() {
  isLoggedIn.value = !!localStorage.getItem("token");
  const storedStudent = localStorage.getItem("student");
  if (storedStudent) {
    try {
      const parsed = JSON.parse(storedStudent);
      studentName.value = parsed.fullName || "Student";
    } catch {
      studentName.value = "Student";
    }
  } else {
    studentName.value = "";
  }
}

watch(() => route.path, updateState, { immediate: true });

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("student");
  updateState();
  router.push("/student/login");
}
</script>

<style scoped>
.navbar-header {
  height: 72px;
  background: #1b3a82;
  color: white;
  border-bottom: 1px solid #1e293b;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.12);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-container {
  max-width: 1400px;
  height: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-logo {
  width: 40px;
  height: 40px;
  background: #2563eb;
  color: #ffffff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
}

.brand-info {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #ffffff;
  line-height: 1.2;
}

.brand-subtitle {
  font-size: 0.675rem;
  color: #38bdf8;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-btn {
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-ghost {
  color: #f8fafc;
  background: transparent;
  border: 1px solid transparent;
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
}

.btn-primary {
  background: #2563eb;
  color: #ffffff;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.4);
}

.btn-primary:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.5);
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #122d58;
  padding: 6px 14px 6px 8px;
  border-radius: 99px;
  border: 1px solid #334155;
}

.avatar {
  width: 30px;
  height: 30px;
  background: #0284c7;
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #f8fafc;
  line-height: 1.2;
}

.user-role {
  font-size: 0.675rem;
  color: #38bdf8;
  font-weight: 600;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(239, 68, 68, 0.1);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.3);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background: #dc2626;
  border-color: #dc2626;
  color: #ffffff;
}
</style>
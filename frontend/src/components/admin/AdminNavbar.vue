<template>
  <header class="admin-navbar">
    <div class="navbar-container">
      <div class="brand">
        <div class="shield-logo">
          <span>🛡️</span>
        </div>
        <div class="brand-text">
          <h2>Admission Management System</h2>
          <span class="system-tag">ADMINISTRATION PORTAL</span>
        </div>
      </div>

      <div class="admin-actions" v-if="isAdminLoggedIn">
        <div class="admin-profile">
          <div class="admin-avatar">A</div>
          <span class="user">Welcome, Admin</span>
        </div>

        <button class="logout-btn" @click="logout">
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const isAdminLoggedIn = ref(!!localStorage.getItem("adminToken"));

watch(() => route.path, () => {
  isAdminLoggedIn.value = !!localStorage.getItem("adminToken");
}, { immediate: true });

function logout(){
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    isAdminLoggedIn.value = false;
    router.push("/admin/login");
}
</script>

<style scoped>
.admin-navbar {
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

.shield-logo {
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

.brand-text h2 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
}

.system-tag {
  font-size: 0.675rem;
  font-weight: 700;
  color: #38bdf8;
  letter-spacing: 0.08em;
}

.admin-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.admin-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #122d58;
  padding: 6px 14px 6px 8px;
  border-radius: 99px;
  border: 1px solid #334155;
}

.admin-avatar {
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

.user {
  font-size: 0.875rem;
  font-weight: 600;
  color: #f8fafc;
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
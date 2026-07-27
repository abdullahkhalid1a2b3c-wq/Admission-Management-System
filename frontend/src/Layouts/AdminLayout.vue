<template>
  <div class="admin-layout-wrapper">
    <AdminNavbar />

    <div class="admin-main" :class="{ 'auth-mode': !isAdminLoggedIn }">
      <AdminSidebar v-if="isAdminLoggedIn" />

      <main class="admin-content" :class="{ 'auth-content': !isAdminLoggedIn }">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import AdminNavbar from "../components/admin/AdminNavbar.vue";
import AdminSidebar from "../components/admin/AdminSidebar.vue";

const route = useRoute();
const isAdminLoggedIn = ref(!!localStorage.getItem("adminToken"));

watch(
  () => route.path,
  () => {
    isAdminLoggedIn.value = !!localStorage.getItem("adminToken");
  },
  { immediate: true }
);
</script>

<style scoped>
.admin-layout-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
}

.admin-main {
  display: flex;
  flex: 1;
}

.admin-main.auth-mode {
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  background: #f1f5f9;
}

.admin-content {
  flex: 1;
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.admin-content.auth-content {
  max-width: 480px;
  padding: 0;
  margin: 0;
}

@media (max-width: 768px) {
  .admin-main {
    flex-direction: column;
  }
  .admin-content {
    padding: 20px 16px;
  }
}
</style>
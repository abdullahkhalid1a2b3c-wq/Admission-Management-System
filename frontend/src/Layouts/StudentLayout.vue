<template>
  <div class="layout-wrapper">
    <StudentNavbar />

    <div class="layout-body" :class="{ 'auth-mode': !isLoggedIn }">
      <StudentSidebar v-if="isLoggedIn" />

      <main class="content-container" :class="{ 'auth-container': !isLoggedIn }">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import StudentNavbar from "../components/student/StudentNavbar.vue";
import StudentSidebar from "../components/student/StudentSidebar.vue";

const route = useRoute();
const isLoggedIn = ref(!!localStorage.getItem("token"));

watch(
  () => route.path,
  () => {
    isLoggedIn.value = !!localStorage.getItem("token");
  },
  { immediate: true }
);
</script>

<style scoped>
.layout-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
}

.layout-body {
  display: flex;
  flex: 1;
}

.layout-body.auth-mode {
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background: linear-gradient(180deg, #eff6ff 0%, #f4f7fb 100%);
}

.content-container {
  flex: 1;
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.content-container.auth-container {
  max-width: 680px;
  padding: 0;
  margin: 0;
}

@media (max-width: 768px) {
  .layout-body {
    flex-direction: column;
  }
  .content-container {
    padding: 20px 16px;
  }
}
</style>
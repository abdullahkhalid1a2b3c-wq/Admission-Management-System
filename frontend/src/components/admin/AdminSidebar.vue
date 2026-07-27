<template>
  <aside class="admin-sidebar">
    <div class="sidebar-section-title">ADMIN MENU</div>

    <nav class="sidebar-menu">
      <router-link to="/admin/dashboard" class="nav-item">
        <span class="nav-icon">📊</span>
        <span>Dashboard</span>
      </router-link>

      <router-link to="/admin/admissions" class="nav-item">
        <span class="nav-icon">📋</span>
        <span>Admissions</span>
      </router-link>

      <router-link to="/admin/merit-list" class="nav-item">
        <span class="nav-icon">⭐</span>
        <span>Merit List</span>
      </router-link>

      <router-link to="/admin/reports" class="nav-item">
        <span class="nav-icon">📈</span>
        <span>Reports</span>
      </router-link>

      <router-link to="/admin/settings" class="nav-item">
        <span class="nav-icon">⚙️</span>
        <span>Settings</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
</script>

<style scoped>
.admin-sidebar {
  width: 250px;
  background: #1e293b;
  min-height: calc(100vh - 72px);
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #334155;
}

.sidebar-section-title {
  padding: 0 12px 12px 12px;
  font-size: 0.725rem;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.08em;
  border-bottom: 1px dashed #334155;
  margin-bottom: 12px;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.925rem;
  font-weight: 500;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.nav-icon {
  color: #64748b;
  transition: color 0.2s ease;
}

.nav-item:hover {
  background: #334155;
  color: #ffffff;
}

.nav-item:hover .nav-icon {
  color: #38bdf8;
}

.router-link-active {
  background: #2563eb !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.router-link-active .nav-icon {
  color: #ffffff !important;
}

@media (max-width: 768px) {
  .admin-sidebar {
    width: 100%;
    min-height: auto;
    border-right: none;
    border-bottom: 1px solid #334155;
  }
}
</style>
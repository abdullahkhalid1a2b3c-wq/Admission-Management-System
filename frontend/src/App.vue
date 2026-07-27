<template>
  <router-view />
</template>

<style>
:root {
  --primary: #1e40af;
  --primary-hover: #1e3a8a;
  --primary-light: #eff6ff;
  --accent: #2563eb;
  --secondary: #475569;
  --success: #059669;
  --success-bg: #ecfdf5;
  --warning: #d97706;
  --warning-bg: #fffbeb;
  --danger: #dc2626;
  --danger-bg: #fef2f2;
  --bg-main: #f4f7fb;
  --bg-card: #ffffff;
  --text-dark: #0f172a;
  --text-muted: #64748b;
  --border: #e2e8f0;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.03);
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--bg-main);
  color: var(--text-dark);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

button, input, select, textarea {
  font-family: inherit;
}

/* Custom scrollbars */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f5f9;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Common badge classes */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 600;
}
.badge-pending, .Pending {
  background-color: #fef3c7;
  color: #b45309;
}
.badge-approved, .Approved, .Eligible {
  background-color: #d1fae5;
  color: #047857;
}
.badge-rejected, .Rejected, .Not\ Eligible {
  background-color: #fee2e2;
  color: #b91c1c;
}
</style>
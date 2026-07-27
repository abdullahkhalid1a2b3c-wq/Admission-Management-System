<template>
  <div class="stat-card">
    <div class="stat-info">
      <span class="stat-title">{{ title }}</span>
      <div class="stat-value">{{ number !== undefined ? number : value }}</div>
    </div>
    <div class="stat-icon-wrap" :class="colorClass" v-if="$slots.icon">
      <slot name="icon"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  number: [Number, String],
  value: [Number, String],
  colorClass: {
    type: String,
    default: "blue"
  }
});
</script>

<style scoped>
.stat-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.stat-title {
  font-size: 0.825rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1;
}

.stat-icon-wrap {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon-wrap.blue { background: #eff6ff; color: #2563eb; }
.stat-icon-wrap.amber { background: #fffbeb; color: #d97706; }
.stat-icon-wrap.emerald { background: #ecfdf5; color: #059669; }
.stat-icon-wrap.rose { background: #fff1f2; color: #e11d48; }
.stat-icon-wrap.indigo { background: #e0e7ff; color: #4338ca; }
</style>
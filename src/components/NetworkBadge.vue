<template>
  <div class="panel" style="display: flex; justify-content: space-between; align-items: center;">
    <div>
      <p class="text-muted" style="margin: 0;">Network status</p>
      <strong>{{ label }}</strong>
    </div>
    <span :class="['badge', badgeClass]">
      <span v-if="loading">Checking...</span>
      <span v-else-if="status?.healthy">Healthy</span>
      <span v-else>Unavailable</span>
      <template v-if="latency">({{ latency }} ms)</template>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { NetworkStatus } from '@/chains/types';

interface Props {
  status: NetworkStatus | null;
  loading: boolean;
}

const props = defineProps<Props>();

const label = computed(() => {
  if (props.status) {
    return `${props.status.chainName} RPC`;
  }
  return 'Mysten Gateway';
});

const latency = computed(() => {
  if (props.status?.latencyMs) {
    return props.status.latencyMs;
  }
  return null;
});

const badgeClass = computed(() => {
  if (props.loading) {
    return 'badge-warning';
  }
  if (props.status?.healthy) {
    return 'badge-success';
  }
  return 'badge-error';
});
</script>

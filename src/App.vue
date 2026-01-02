<template>
  <main class="app-shell">
    <header style="margin-bottom: 1.5rem;">
      <h1 style="margin-bottom: 0.25rem;">Asset view</h1>
      <p class="text-muted" style="margin: 0;">
        Proof-of-concept Vue 3 dashboard prepared for multi-chain expansion. Currently sourcing data from the Sui Mysten Gateway.
      </p>
    </header>

    <WalletInput v-model="address" :loading="portfolioStore.status === 'loading'" @submit="fetchAssets" />

    <PortfolioSummary :summary="portfolioStore.summary" :status="portfolioStore.status" />

    <AssetTable :assets="portfolioStore.assets" :status="portfolioStore.status" :error="portfolioStore.error" />

    <NetworkBadge :status="networkStore.status" :loading="networkStore.loading" />
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import WalletInput from '@/components/WalletInput.vue';
import PortfolioSummary from '@/components/PortfolioSummary.vue';
import AssetTable from '@/components/AssetTable.vue';
import NetworkBadge from '@/components/NetworkBadge.vue';
import { usePortfolioStore } from '@/stores/portfolio';
import { useNetworkStore } from '@/stores/network';

const portfolioStore = usePortfolioStore();
const networkStore = useNetworkStore();

const address = computed({
  get: () => portfolioStore.address,
  set: (value: string) => portfolioStore.setAddress(value)
});

const fetchAssets = () => {
  portfolioStore.loadPortfolio();
};

onMounted(() => {
  networkStore.checkStatus();
});
</script>

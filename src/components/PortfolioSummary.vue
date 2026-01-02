<template>
  <section class="panel">
    <h2 style="margin-bottom: 0.5rem;">Portfolio summary</h2>
    <p class="text-muted" style="margin-top: 0;">Read-only snapshot from the Sui network.</p>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-top: 1.5rem;">
      <div class="summary-card">
        <p class="text-muted" style="margin: 0;">Tracked tokens</p>
        <p style="font-size: 1.5rem; margin: 0;">
          {{ summary ? summary.tokenTypes : '-' }}
        </p>
      </div>
      <div class="summary-card">
        <p class="text-muted" style="margin: 0;">Coin objects</p>
        <p style="font-size: 1.5rem; margin: 0;">
          {{ summary ? summary.totalCoinObjects : '-' }}
        </p>
      </div>
      <div class="summary-card" v-if="summary?.primaryCoin">
        <p class="text-muted" style="margin: 0;">{{ summary.primaryCoin.symbol }} balance</p>
        <p style="font-size: 1.5rem; margin: 0;">
          {{ summary.primaryCoin.formattedBalance }}
        </p>
      </div>
    </div>

    <p v-if="status === 'loading'" class="text-muted" style="margin-top: 1rem;">Fetching balances...</p>
  </section>
</template>

<script setup lang="ts">
import type { PortfolioSummary } from '@/chains/types';

interface Props {
  summary: PortfolioSummary | null;
  status: 'idle' | 'loading' | 'ready' | 'error';
}

defineProps<Props>();
</script>

<style scoped>
.summary-card {
  padding: 1rem;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.15);
}
</style>

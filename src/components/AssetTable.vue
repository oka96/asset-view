<template>
  <section class="panel">
    <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <div>
        <h2 style="margin: 0;">Tracked assets</h2>
        <p class="text-muted" style="margin: 0;">Balances grouped by coin type.</p>
      </div>
      <span v-if="status === 'ready'" class="text-muted">{{ assets.length }} token types</span>
    </header>

    <div v-if="status === 'loading'">
      <div class="skeleton" style="height: 48px; margin-bottom: 0.75rem;"></div>
      <div class="skeleton" style="height: 48px; margin-bottom: 0.75rem;"></div>
      <div class="skeleton" style="height: 48px;"></div>
    </div>

    <div v-else-if="status === 'error'">
      <p class="text-muted">{{ error }}</p>
    </div>

    <div v-else-if="status === 'ready' && assets.length === 0">
      <p class="text-muted">No assets detected for this address.</p>
    </div>

    <div v-else>
      <div class="asset-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          class="asset-tab"
          :class="{ 'asset-tab--active': tab.key === activeTab }"
          @click="activeTab = tab.key"
        >
          {{ tab.title }}
          <span class="asset-tab__count">{{ tab.assets.length }}</span>
        </button>
      </div>

      <div v-if="currentAssets.length === 0" class="text-muted" style="margin-top: 1rem;">
        No {{ activeTab }} assets detected for this wallet.
      </div>

      <div v-else class="asset-grid">
        <article v-for="asset in currentAssets" :key="asset.id" class="asset-card">
          <header class="asset-card__header">
            <div class="asset-card__title">
              <img
                v-if="asset.metadata.iconUrl"
                :src="asset.metadata.iconUrl"
                :alt="`${asset.metadata.symbol} icon`"
                class="asset-card__icon"
              />
              <div>
                <p class="asset-card__symbol">{{ asset.metadata.symbol }}</p>
                <p class="text-muted asset-card__name">{{ asset.metadata.name }}</p>
              </div>
            </div>
          </header>
          <dl class="asset-card__stats">
            <div>
              <dt>Total balance</dt>
              <dd>{{ asset.formattedBalance }}</dd>
            </div>
            <div>
              <dt>Coin objects</dt>
              <dd>{{ asset.objectCount }}</dd>
            </div>
          </dl>
          <p class="asset-card__coin-type">{{ asset.coinType }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Asset } from '@/chains/types';

interface Props {
  assets: Asset[];
  status: 'idle' | 'loading' | 'ready' | 'error';
  error: string;
}

type AssetTabKey = 'verified' | 'unverified';

const props = defineProps<Props>();
const activeTab = ref<AssetTabKey>('verified');

const tabs = computed(() => {
  const verified = props.assets.filter((asset) => asset.metadata.verified);
  const unverified = props.assets.filter((asset) => !asset.metadata.verified);

  return [
    { key: 'verified', title: 'Verified assets', assets: verified },
    { key: 'unverified', title: 'Unverified assets', assets: unverified }
  ] as const;
});

const currentAssets = computed(() => {
  const current = tabs.value.find((tab) => tab.key === activeTab.value);
  return current?.assets ?? [];
});
</script>

<style scoped>
.asset-tabs {
  display: inline-flex;
  background: rgba(15, 23, 42, 0.7);
  border-radius: 999px;
  padding: 0.25rem;
  border: 1px solid rgba(148, 163, 184, 0.2);
  margin-bottom: 1rem;
}

.asset-tab {
  border: none;
  background: transparent;
  color: #94a3b8;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.asset-tab--active {
  background: rgba(37, 99, 235, 0.2);
  color: #e2e8f0;
}

.asset-tab__count {
  font-size: 0.85rem;
  color: inherit;
}

.asset-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.asset-card {
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 16px;
  padding: 1rem;
  background: rgba(15, 23, 42, 0.6);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.asset-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
}

.asset-card__title {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.asset-card__icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(148, 163, 184, 0.4);
  object-fit: cover;
  background: rgba(30, 41, 59, 0.8);
}

.asset-card__symbol {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.asset-card__name {
  margin: 0;
  font-size: 0.85rem;
}

.asset-card__stats {
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.asset-card__stats dt {
  margin: 0;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #94a3b8;
}

.asset-card__stats dd {
  margin: 0;
  font-size: 1rem;
}

.asset-card__coin-type {
  margin: 0;
  font-size: 0.75rem;
  color: #94a3b8;
  word-break: break-all;
}
</style>

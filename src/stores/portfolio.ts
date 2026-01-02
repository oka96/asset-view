import { defineStore } from 'pinia';
import type { Asset, PortfolioSummary } from '@/chains/types';
import { chainService } from '@/chains';

type PortfolioState = 'idle' | 'loading' | 'ready' | 'error';

export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    address: '',
    assets: [] as Asset[],
    summary: null as PortfolioSummary | null,
    status: 'idle' as PortfolioState,
    error: ''
  }),
  actions: {
    setAddress(address: string) {
      this.address = address;
    },
    async loadPortfolio(address?: string) {
      const target = (address ?? this.address).trim();
      if (!target) {
        this.error = 'Enter a Sui wallet address to continue.';
        this.status = 'error';
        return;
      }

      this.status = 'loading';
      this.error = '';
      this.address = target;

      try {
        const assets = await chainService.listAssets(target);
        this.assets = assets;
        this.summary = chainService.summarizePortfolio(assets);
        this.status = 'ready';
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Unable to load assets.';
        this.assets = [];
        this.summary = null;
        this.status = 'error';
      }
    }
  }
});

import { defineStore } from 'pinia';
import { chainService } from '@/chains';
export const usePortfolioStore = defineStore('portfolio', {
    state: () => ({
        address: '',
        assets: [],
        summary: null,
        status: 'idle',
        error: ''
    }),
    actions: {
        setAddress(address) {
            this.address = address;
        },
        async loadPortfolio(address) {
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
            }
            catch (error) {
                this.error = error instanceof Error ? error.message : 'Unable to load assets.';
                this.assets = [];
                this.summary = null;
                this.status = 'error';
            }
        }
    }
});

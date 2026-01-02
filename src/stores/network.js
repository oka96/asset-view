import { defineStore } from 'pinia';
import { chainService } from '@/chains';
export const useNetworkStore = defineStore('network-status', {
    state: () => ({
        status: null,
        loading: false,
        error: ''
    }),
    actions: {
        async checkStatus() {
            this.loading = true;
            this.error = '';
            try {
                this.status = await chainService.getNetworkStatus();
            }
            catch (error) {
                this.error = error instanceof Error ? error.message : 'Unable to reach network.';
                this.status = null;
            }
            finally {
                this.loading = false;
            }
        }
    }
});

import type { NetworkStatus } from '@/chains/types';
export declare const useNetworkStore: import("pinia").StoreDefinition<"network-status", {
    status: NetworkStatus | null;
    loading: boolean;
    error: string;
}, {}, {
    checkStatus(): Promise<void>;
}>;

import type { Asset, PortfolioSummary } from '@/chains/types';
type PortfolioState = 'idle' | 'loading' | 'ready' | 'error';
export declare const usePortfolioStore: import("pinia").StoreDefinition<"portfolio", {
    address: string;
    assets: Asset[];
    summary: PortfolioSummary | null;
    status: PortfolioState;
    error: string;
}, {}, {
    setAddress(address: string): void;
    loadPortfolio(address?: string): Promise<void>;
}>;
export {};

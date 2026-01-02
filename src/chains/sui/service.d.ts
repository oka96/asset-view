import type { Asset, ChainService, NetworkStatus, PortfolioSummary } from '@/chains/types';
export declare class SuiService implements ChainService {
    private readonly rpcUrl;
    private metadataCache;
    private requestId;
    constructor(rpcUrl?: string);
    listAssets(address: string): Promise<Asset[]>;
    summarizePortfolio(assets: Asset[]): PortfolioSummary;
    getNetworkStatus(): Promise<NetworkStatus>;
    private fetchMetadata;
    private rpcCall;
}

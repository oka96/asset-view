export interface AssetMetadata {
    name: string;
    symbol: string;
    decimals: number;
    description?: string;
}
export interface Asset {
    id: string;
    coinType: string;
    metadata: AssetMetadata;
    totalBalance: string;
    formattedBalance: string;
    objectCount: number;
}
export interface PortfolioSummary {
    chainName: string;
    tokenTypes: number;
    totalCoinObjects: number;
    primaryCoin?: {
        symbol: string;
        formattedBalance: string;
    };
}
export interface NetworkStatus {
    chainName: string;
    endpoint: string;
    healthy: boolean;
    latencyMs?: number;
    lastChecked: string;
    message?: string;
}
export interface ChainService {
    listAssets(address: string): Promise<Asset[]>;
    summarizePortfolio(assets: Asset[]): PortfolioSummary;
    getNetworkStatus(): Promise<NetworkStatus>;
}

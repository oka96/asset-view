import type { Asset, AssetMetadata, ChainService, NetworkStatus, PortfolioSummary } from '@/chains/types';

const DEFAULT_RPC_URL = import.meta.env.VITE_SUI_RPC_URL ?? 'https://fullnode.mainnet.sui.io';
const SUI_COIN_TYPE = '0x2::sui::SUI';

interface JsonRpcResponse<T> {
  result?: T;
  error?: {
    message: string;
  };
}

interface BalanceResponse {
  coinType: string;
  coinObjectCount: number;
  totalBalance: string;
}

interface CoinMetadataResponse {
  name?: string;
  symbol?: string;
  description?: string;
  decimals?: number;
  iconUrl?: string;
}

const powBigInt = (base: bigint, exp: number) => {
  let result = 1n;
  for (let i = 0; i < exp; i += 1) {
    result *= base;
  }
  return result;
};

const formatUnits = (value: string, decimals: number) => {
  if (!decimals) {
    return value;
  }
  const bigValue = BigInt(value);
  const divisor = powBigInt(10n, decimals);
  const whole = bigValue / divisor;
  const fraction = bigValue % divisor;
  if (fraction === BigInt(0)) {
    return whole.toString();
  }
  const fractionStr = fraction.toString().padStart(decimals, '0').replace(/0+$/, '');
  return `${whole.toString()}.${fractionStr.slice(0, 4)}`;
};

export class SuiService implements ChainService {
  private readonly rpcUrl: string;
  private metadataCache = new Map<string, AssetMetadata>();
  private requestId = 0;

  constructor(rpcUrl: string = DEFAULT_RPC_URL) {
    this.rpcUrl = rpcUrl;
  }

  async listAssets(address: string): Promise<Asset[]> {
    if (!address) {
      return [];
    }

    const balances = await this.rpcCall<BalanceResponse[]>('suix_getAllBalances', [address]);

    const assets = await Promise.all(
      balances.map(async (balance) => {
        const metadata = await this.fetchMetadata(balance.coinType);
        return {
          id: `${balance.coinType}-${metadata.symbol}`,
          coinType: balance.coinType,
          metadata,
          totalBalance: balance.totalBalance,
          formattedBalance: formatUnits(balance.totalBalance, metadata.decimals),
          objectCount: balance.coinObjectCount
        } satisfies Asset;
      })
    );

    return assets.sort((a, b) => Number(BigInt(b.totalBalance) - BigInt(a.totalBalance)));
  }

  summarizePortfolio(assets: Asset[]): PortfolioSummary {
    const summary: PortfolioSummary = {
      chainName: 'Sui',
      tokenTypes: assets.length,
      totalCoinObjects: assets.reduce((acc, asset) => acc + asset.objectCount, 0)
    };

    const suiAsset = assets.find((asset) => asset.coinType === SUI_COIN_TYPE);
    if (suiAsset) {
      summary.primaryCoin = {
        symbol: suiAsset.metadata.symbol,
        formattedBalance: suiAsset.formattedBalance
      };
    }

    return summary;
  }

  async getNetworkStatus(): Promise<NetworkStatus> {
    const start = typeof performance !== 'undefined' ? performance.now() : Date.now();
    try {
      const identifier = await this.rpcCall<string>('sui_getChainIdentifier', []);
      const end = typeof performance !== 'undefined' ? performance.now() : Date.now();
      return {
        chainName: 'Sui',
        endpoint: this.rpcUrl,
        healthy: true,
        latencyMs: Math.round(end - start),
        lastChecked: new Date().toISOString(),
        message: identifier
      };
    } catch (error) {
      const err = error instanceof Error ? error.message : 'Unable to reach Sui RPC endpoint';
      return {
        chainName: 'Sui',
        endpoint: this.rpcUrl,
        healthy: false,
        lastChecked: new Date().toISOString(),
        message: err
      };
    }
  }

  private async fetchMetadata(coinType: string): Promise<AssetMetadata> {
    if (this.metadataCache.has(coinType)) {
      return this.metadataCache.get(coinType)!;
    }

    const result = await this.rpcCall<CoinMetadataResponse | null>('suix_getCoinMetadata', [coinType]);
    const metadata: AssetMetadata = {
      name: result?.name ?? coinType,
      symbol: result?.symbol ?? coinType.split('::').pop() ?? 'UNKNOWN',
      description: result?.description,
      decimals: result?.decimals ?? 0,
      verified: Boolean(result),
      iconUrl: result?.iconUrl
    };

    this.metadataCache.set(coinType, metadata);
    return metadata;
  }

  private async rpcCall<T>(method: string, params: unknown[]): Promise<T> {
    const body = {
      jsonrpc: '2.0',
      id: ++this.requestId,
      method,
      params
    };

    const response = await fetch(this.rpcUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Sui RPC responded with status ${response.status}`);
    }

    const payload = (await response.json()) as JsonRpcResponse<T>;
    if (payload.error) {
      throw new Error(payload.error.message);
    }

    if (typeof payload.result === 'undefined') {
      throw new Error('Sui RPC returned an empty response');
    }

    return payload.result;
  }
}

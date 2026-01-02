import { SuiService } from '@/chains/sui/service';
const rpcUrl = import.meta.env.VITE_SUI_RPC_URL ?? 'https://fullnode.mainnet.sui.io';
export const chainService = new SuiService(rpcUrl);

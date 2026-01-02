# asset-view

Proof-of-concept Vue 3 dashboard that visualizes a wallet's balances on Sui while keeping the architecture flexible for future multi-chain support.

## Features
- Vue 3 + Vite + TypeScript + Pinia scaffold designed for rapid iteration.
- Chain abstraction via `ChainService` so new blockchains can plug in without touching UI code.
- Live data fetches from the Mysten Gateway RPC (configurable through an environment variable).
- Portfolio summary, asset table (with verified/unverified groupings and token icons when available), and network health indicator components ready for reuse.

## Getting started
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Configure the Sui RPC endpoint (optional)**
   - Duplicate `.env.example` and adjust `VITE_SUI_RPC_URL` if needed.
   - Defaults to Mysten's Gateway: `https://fullnode.mainnet.sui.io`.
3. **Run the dev server**
   ```bash
   npm run dev
   ```
4. **Build for production**
   ```bash
   npm run build
   ```
5. **Execute unit tests**
   ```bash
   npm run test
   ```

## Architecture highlights
- `src/chains/` contains the shared types and the Sui implementation of `ChainService` (responsible for RPC calls, metadata normalization, and network health reporting).
- `src/stores/` exposes Pinia stores for portfolios and network status so UI components stay presentation-focused.
- `src/components/` includes small, chain-agnostic building blocks (`WalletInput`, `PortfolioSummary`, `AssetTable`, `NetworkBadge`).
- Future chains can mirror the Sui folder structure, register their service inside `src/chains/index.ts`, and reuse the same store/component wiring.

## Next steps
- Expand `ChainService` to support batching, caching, and pagination when additional blockchains are added.
- Integrate real wallet adapters (e.g., Sui Wallet Kit) instead of manual address input.
- Wire up pricing data / USD valuations for richer summaries.

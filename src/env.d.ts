/// <reference types="vite/client" />

declare namespace NodeJS {
  interface ProcessEnv {
    VITE_SUI_RPC_URL?: string;
  }
}

import { computed, onMounted } from 'vue';
import WalletInput from '@/components/WalletInput.vue';
import PortfolioSummary from '@/components/PortfolioSummary.vue';
import AssetTable from '@/components/AssetTable.vue';
import NetworkBadge from '@/components/NetworkBadge.vue';
import { usePortfolioStore } from '@/stores/portfolio';
import { useNetworkStore } from '@/stores/network';
const portfolioStore = usePortfolioStore();
const networkStore = useNetworkStore();
const address = computed({
    get: () => portfolioStore.address,
    set: (value) => portfolioStore.setAddress(value)
});
const fetchAssets = () => {
    portfolioStore.loadPortfolio();
};
onMounted(() => {
    networkStore.checkStatus();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
    ...{ class: "app-shell" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-muted" },
    ...{ style: {} },
});
/** @type {[typeof WalletInput, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(WalletInput, new WalletInput({
    ...{ 'onSubmit': {} },
    modelValue: (__VLS_ctx.address),
    loading: (__VLS_ctx.portfolioStore.status === 'loading'),
}));
const __VLS_1 = __VLS_0({
    ...{ 'onSubmit': {} },
    modelValue: (__VLS_ctx.address),
    loading: (__VLS_ctx.portfolioStore.status === 'loading'),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
let __VLS_5;
const __VLS_6 = {
    onSubmit: (__VLS_ctx.fetchAssets)
};
var __VLS_2;
/** @type {[typeof PortfolioSummary, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(PortfolioSummary, new PortfolioSummary({
    summary: (__VLS_ctx.portfolioStore.summary),
    status: (__VLS_ctx.portfolioStore.status),
}));
const __VLS_8 = __VLS_7({
    summary: (__VLS_ctx.portfolioStore.summary),
    status: (__VLS_ctx.portfolioStore.status),
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {[typeof AssetTable, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(AssetTable, new AssetTable({
    assets: (__VLS_ctx.portfolioStore.assets),
    status: (__VLS_ctx.portfolioStore.status),
    error: (__VLS_ctx.portfolioStore.error),
}));
const __VLS_11 = __VLS_10({
    assets: (__VLS_ctx.portfolioStore.assets),
    status: (__VLS_ctx.portfolioStore.status),
    error: (__VLS_ctx.portfolioStore.error),
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
/** @type {[typeof NetworkBadge, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(NetworkBadge, new NetworkBadge({
    status: (__VLS_ctx.networkStore.status),
    loading: (__VLS_ctx.networkStore.loading),
}));
const __VLS_14 = __VLS_13({
    status: (__VLS_ctx.networkStore.status),
    loading: (__VLS_ctx.networkStore.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
/** @type {__VLS_StyleScopedClasses['app-shell']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            WalletInput: WalletInput,
            PortfolioSummary: PortfolioSummary,
            AssetTable: AssetTable,
            NetworkBadge: NetworkBadge,
            portfolioStore: portfolioStore,
            networkStore: networkStore,
            address: address,
            fetchAssets: fetchAssets,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

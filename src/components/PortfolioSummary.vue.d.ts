import type { PortfolioSummary } from '@/chains/types';
interface Props {
    summary: PortfolioSummary | null;
    status: 'idle' | 'loading' | 'ready' | 'error';
}
declare const _default: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;

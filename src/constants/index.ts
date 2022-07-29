import { number } from 'starknet';

export const ETH_ADDRESS = '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7';
export const ORGANIZATION_CONTRACT_ADDRESS = '0x02bbf7e9c8640940da9a97ce6494bed934c96a9f40cd8965b4d0920889452cdf';

export const DEFAULT_PRECISION = 18;
export const WEI_IN_ETH = number.toBN(`1${'0'.repeat(DEFAULT_PRECISION)}`);

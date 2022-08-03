import { number } from 'starknet';

export const ETH_ADDRESS = '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7';
export const ORGANIZATION_CONTRACT_ADDRESS = '0x05e8d3134049d878eb0f9043d5e2623193b5e656fb5cac21a68796f67c1ede35';

export const DEFAULT_PRECISION = 18;
export const WEI_IN_ETH = number.toBN(`1${'0'.repeat(DEFAULT_PRECISION)}`);

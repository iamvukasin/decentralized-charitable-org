import { number } from 'starknet';

export const ETH_ADDRESS = '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7';
export const ORGANIZATION_CONTRACT_ADDRESS = '0x0139335bd3e9775bd5081a553d7e7f7786bbbf5ad0577776d84fc34400d8cee8';

export const DEFAULT_PRECISION = 18;
export const WEI_IN_ETH = number.toBN(`1${'0'.repeat(DEFAULT_PRECISION)}`);

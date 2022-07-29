import { Abi, Account, Contract, number, Provider } from 'starknet';
import { bnToUint256 } from 'starknet/dist/utils/uint256';
import { ETH_ADDRESS, ORGANIZATION_CONTRACT_ADDRESS, WEI_IN_ETH } from '../constants';
import organizationAbi from '../abi/OrganizationAbi.json';

export class OrganizationService {
  static async donate(sender: Account, target: number, amount: number) {
    const organization = new Contract(organizationAbi as Abi, ORGANIZATION_CONTRACT_ADDRESS, sender);
    const normalizedAmount = number.toBN(amount).mul(WEI_IN_ETH);
    await organization.donate(target, ETH_ADDRESS, bnToUint256(normalizedAmount));
  }
}

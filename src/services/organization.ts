import BN from 'bn.js';
import { Abi, Account, Contract, number } from 'starknet';
import { bnToUint256, uint256ToBN } from 'starknet/dist/utils/uint256';
import { ETH_ADDRESS, ORGANIZATION_CONTRACT_ADDRESS, WEI_IN_ETH } from '../constants';
import organizationAbi from '../abi/OrganizationAbi.json';

export class OrganizationService {
  static async getTarget(targetId: number): Promise<{ collected: BN; goal: BN }> {
    const organization = new Contract(organizationAbi as Abi, ORGANIZATION_CONTRACT_ADDRESS);
    const [target] = await organization.get_target(targetId);

    return {
      collected: uint256ToBN(target.balance),
      goal: uint256ToBN(target.goal),
    };
  }

  static async donate(sender: Account, target: number, amount: number) {
    const organization = new Contract(organizationAbi as Abi, ORGANIZATION_CONTRACT_ADDRESS, sender);
    const normalizedAmount = number.toBN(amount).mul(WEI_IN_ETH);
    await organization.donate(target, ETH_ADDRESS, bnToUint256(normalizedAmount));
  }
}

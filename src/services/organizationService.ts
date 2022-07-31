import BN from 'bn.js';
import { Abi, Account, Contract } from 'starknet';
import { bnToUint256, uint256ToBN } from 'starknet/dist/utils/uint256';
import { ETH_ADDRESS, ORGANIZATION_CONTRACT_ADDRESS } from '../constants';
import organizationAbi from '../abi/OrganizationAbi.json';
import { numberToBN } from '../utils';

export default class OrganizationService {
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
    const normalizedAmount = numberToBN(amount);
    await organization.donate(target, ETH_ADDRESS, bnToUint256(normalizedAmount));
  }
}

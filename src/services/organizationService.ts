import BN from 'bn.js';
import { Abi, Account, Contract } from 'starknet';
import { bnToUint256, uint256ToBN } from 'starknet/dist/utils/uint256';
import { ETH_ADDRESS, ORGANIZATION_CONTRACT_ADDRESS } from '../constants';
import organizationAbi from '../abi/OrganizationAbi.json';
import { numberToBN } from '../utils';

export default class OrganizationService {
  static async getTarget(targetId: number): Promise<{ collected: BN; goal: BN }> {
    const [target] = await this.getContract().get_target(targetId);

    return {
      collected: uint256ToBN(target.balance),
      goal: uint256ToBN(target.goal),
    };
  }

  static async donate(sender: Account, target: number, amount: number) {
    const normalizedAmount = numberToBN(amount);
    await this.getContract(sender).donate(target, ETH_ADDRESS, bnToUint256(normalizedAmount));
  }

  static async priorityDonate(sender: Account, amount: number) {
    const normalizedAmount = numberToBN(amount);
    await this.getContract(sender).priority_donate(ETH_ADDRESS, bnToUint256(normalizedAmount));
  }

  static async donateEqually(sender: Account, amount: number) {
    const normalizedAmount = numberToBN(amount);
    await this.getContract(sender).donate_equally(ETH_ADDRESS, bnToUint256(normalizedAmount));
  }

  static async bestFitDonate(sender: Account, amount: number) {
    const normalizedAmount = numberToBN(amount);
    await this.getContract(sender).best_fit_donate(ETH_ADDRESS, bnToUint256(normalizedAmount));
  }

  private static getContract(sender?: Account): Contract {
    return new Contract(organizationAbi as Abi, ORGANIZATION_CONTRACT_ADDRESS, sender);
  }
}

import BN from 'bn.js';
import { Abi, Contract } from 'starknet';
import { uint256ToBN } from 'starknet/dist/utils/uint256';
import Erc20Abi from '../abi/Erc20Abi.json';

export class Erc20Service {
  private readonly contract: Contract;

  constructor(contractAddress: string) {
    this.contract = new Contract(Erc20Abi as Abi, contractAddress);
  }

  async balanceOf(address: string): Promise<BN> {
    const [balance] = await this.contract.balanceOf(address);
    return uint256ToBN(balance);
  }
}

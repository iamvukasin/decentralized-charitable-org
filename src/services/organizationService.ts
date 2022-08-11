import BN from 'bn.js';
import { from, map, Observable } from 'rxjs';
import { Abi, AccountInterface, Contract, RpcProvider } from 'starknet';
import { bnToUint256, uint256ToBN } from 'starknet/dist/utils/uint256';
import { ETH_ADDRESS, ORGANIZATION_CONTRACT_ADDRESS } from '../constants';
import organizationAbi from '../abi/OrganizationAbi.json';
import { numberToBN } from '../utils';
import { Donation } from '../interfaces';
import { RPC } from 'starknet/dist/types/api';

interface EventData {
  transaction_hash: string;
  data: string[];
}

const provider = new RpcProvider({
  nodeUrl: `https://${import.meta.env.VITE_RPC_PROVIDER_URL}`,
});

export default class OrganizationService {
  static async getTarget(targetId: number): Promise<{ collected: BN; goal: BN; deadline: number }> {
    const [target] = await this.getContract().get_target(targetId);

    return {
      collected: uint256ToBN(target.balance),
      goal: uint256ToBN(target.goal),
      deadline: target.deadline.toNumber(),
    };
  }

  // Donation options

  static async donate(sender: AccountInterface, target: number, amount: number) {
    const normalizedAmount = numberToBN(amount);
    await this.getContract(sender).donate(target, ETH_ADDRESS, bnToUint256(normalizedAmount));
  }

  static async priorityDonate(sender: AccountInterface, amount: number) {
    const normalizedAmount = numberToBN(amount);
    await this.getContract(sender).priority_donate(ETH_ADDRESS, bnToUint256(normalizedAmount));
  }

  static async donateEqually(sender: AccountInterface, amount: number) {
    const normalizedAmount = numberToBN(amount);
    await this.getContract(sender).donate_equally(ETH_ADDRESS, bnToUint256(normalizedAmount));
  }

  static async bestFitDonate(sender: AccountInterface, amount: number) {
    const normalizedAmount = numberToBN(amount);
    await this.getContract(sender).best_fit_donate(ETH_ADDRESS, bnToUint256(normalizedAmount));
  }

  private static getContract(sender?: AccountInterface): Contract {
    return new Contract(organizationAbi as Abi, ORGANIZATION_CONTRACT_ADDRESS, sender);
  }

  // Donation fetching

  static getDonationsForTarget(targetId: number): Observable<Donation[]> {
    const donations$ = this.getDonations();
    return donations$.pipe(map(donations => donations.filter(donation => donation.target === targetId)));
  }

  static getDonationsFromUser(user: string): Observable<Donation[]> {
    const donations$ = this.getDonations();
    return donations$.pipe(map(donations => donations.filter(donation => donation.donator === user)));
  }

  static getDonations(): Observable<Donation[]> {
    const eventsResponse$ = from(
      provider.getEvents({
        address: ORGANIZATION_CONTRACT_ADDRESS,
        page_size: 50,
        page_number: 0,
      } as RPC.EventFilter),
    );

    return eventsResponse$.pipe(
      map(eventsResponse => {
        const eventsData = eventsResponse.events as unknown as EventData[];

        return eventsData
          .filter(eventData => eventData && eventData.data && eventData.data.length === 5)
          .map(eventData => {
            const [donator, asset, amountLow, amountHigh, targetId] = eventData.data;
            return {
              tx: eventData.transaction_hash,
              donator,
              asset,
              amount: uint256ToBN({ low: new BN(amountLow.slice(2), 'hex'), high: new BN(amountHigh.slice(2), 'hex') }),
              target: parseInt(targetId.slice(2), 16),
            } as Donation;
          });
      }),
    );
  }
}

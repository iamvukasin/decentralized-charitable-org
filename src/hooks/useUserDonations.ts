import { bind } from '@react-rxjs/core';
import { concatMap, of } from 'rxjs';
import { Donation } from '../interfaces';
import { OrganizationService } from '../services';
import { walletAccount$ } from './useWalletAccount';

const donations$ = walletAccount$.pipe(
  concatMap(account => {
    if (!account) {
      return of([] as Donation[]);
    }

    return OrganizationService.getDonationsFromUser(account.address);
  }),
);

export const [useUserDonations] = bind(donations$, []);

import { bind } from '@react-rxjs/core';
import { concatMap, from, of } from 'rxjs';
import { ETH_ADDRESS } from '../constants';
import { Erc20Service } from '../services/erc20Service';
import { walletAccount$ } from './useWalletAccount';

const balance$ = walletAccount$.pipe(
  concatMap(account => {
    if (!account) {
      return of(null);
    }

    const service = new Erc20Service(ETH_ADDRESS);
    return from(service.balanceOf(account.address));
  }),
);

export const [useBalance] = bind(balance$, null);

import { state, useStateObservable } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import { distinctUntilChanged } from 'rxjs';
import { Account } from 'starknet';

const [rawWalletAccount$, setWalletAccount] = createSignal<Account | null>();
export const walletAccount$ = rawWalletAccount$.pipe(distinctUntilChanged());
const stateWalletAccount$ = state(walletAccount$, null);

export const useWalletAccount = (): [Account | null, (account: Account) => void] => {
  const walletAccount = useStateObservable(stateWalletAccount$);

  return [walletAccount, setWalletAccount];
};

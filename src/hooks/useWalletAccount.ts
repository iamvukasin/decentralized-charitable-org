import { state, useStateObservable } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import { distinctUntilChanged } from 'rxjs';
import { AccountInterface } from 'starknet';

const [rawWalletAccount$, setWalletAccount] = createSignal<AccountInterface | null>();
export const walletAccount$ = rawWalletAccount$.pipe(distinctUntilChanged());
const stateWalletAccount$ = state(walletAccount$, null);

export const useWalletAccount = (): [AccountInterface | null, (account: AccountInterface) => void] => {
  const walletAccount = useStateObservable(stateWalletAccount$);

  return [walletAccount, setWalletAccount];
};

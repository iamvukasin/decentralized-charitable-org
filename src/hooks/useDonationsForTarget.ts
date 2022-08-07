import { state, useStateObservable } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import { useCallback } from 'react';
import { distinctUntilChanged } from 'rxjs';
import { Donation } from '../interfaces';
import { OrganizationService } from '../services';

const [rawDonations$, setRawDonations] = createSignal<Donation[]>();
const donations$ = rawDonations$.pipe(distinctUntilChanged());
const state$ = state(donations$, []);

export function useDonationsForTarget(): [Donation[], (value: number) => void] {
  const donations = useStateObservable(state$);

  const setTarget = useCallback((target: number) => {
    OrganizationService.getDonationsForTarget(target).subscribe(setRawDonations);
  }, []);

  return [donations, setTarget];
}

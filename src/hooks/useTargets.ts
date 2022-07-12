import { BehaviorSubject, from, Subscription, tap } from 'rxjs';
import { bind } from '@react-rxjs/core';
import { DonationTarget } from '../interfaces';
import { FirestoreService } from '../services';

const DEFAULT_VALUE: DonationTarget[] | null = null;

const targets$ = new BehaviorSubject<DonationTarget[] | null>(DEFAULT_VALUE);

const stream$ = from(FirestoreService.getTargets()).pipe(tap(targets => targets$.next(targets)));

export const [useTargets] = bind(targets$, []);

let subscription: Subscription;

export const subscribeTargets = (): void => {
  unsubscribeTargets();
  subscription = stream$.subscribe();
};
export const unsubscribeTargets = (): void => subscription?.unsubscribe?.();
export const resetTargets = (): void => targets$.next(DEFAULT_VALUE);

import { BehaviorSubject, from, map, merge, mergeMap, Observable, scan, Subscription, tap } from 'rxjs';
import { bind } from '@react-rxjs/core';
import { DonationTarget } from '../interfaces';
import { FirestoreService, OrganizationService } from '../services';

const DEFAULT_VALUE: DonationTarget[] | null = null;

const targets$ = new BehaviorSubject<DonationTarget[] | null>(DEFAULT_VALUE);

const fetchData = (target: DonationTarget): Observable<DonationTarget> =>
  from(OrganizationService.getTarget(parseInt(target.id))).pipe(
    map(({ collected, goal }) => ({
      id: target.id,
      title: target.title,
      description: target.description,
      collected,
      goal,
    })),
  );

const stream$ = from(FirestoreService.getTargets()).pipe(
  mergeMap(targets => {
    const fetchedTargets$ = targets.map(fetchData);
    return merge(...fetchedTargets$);
  }),
  scan((allTargets, target) => [target, ...allTargets], [] as DonationTarget[]),
  map(targets => targets.sort((a, b) => parseInt(a.id) - parseInt(b.id))),
  tap(targets => {
    targets$.next(targets);
  }),
);

export const [useTargets] = bind(targets$, []);

let subscription: Subscription;

export const subscribeTargets = (): void => {
  unsubscribeTargets();
  subscription = stream$.subscribe();
};
export const unsubscribeTargets = (): void => subscription?.unsubscribe?.();
export const resetTargets = (): void => targets$.next(DEFAULT_VALUE);

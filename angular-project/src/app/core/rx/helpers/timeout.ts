import { interval } from 'rxjs';
import { first, take, tap } from 'rxjs/operators';

export function timeout(callback: () => void, timeout_: number) {
  interval(timeout_)
    .pipe(
      take(1),
      tap(() => {
        callback();
      })
    )
    .subscribe();
}

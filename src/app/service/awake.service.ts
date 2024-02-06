import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AwakeService {

  private readonly cronoMinutesTimeout = 10;

  private wakeLock?: WakeLock;
  private currentLock?: Promise<WakeLockSentinel>;

  private stopCrono$ = new Subject<void>();

  keepAlive$ = new BehaviorSubject<'active' | 'error' | undefined>(undefined);

  constructor() {
    if (navigator && navigator.wakeLock) {
      this.wakeLock = navigator.wakeLock;
    }
  }

  lock(): void {
    if (this.wakeLock) {
      this.refreshTimer();
      if (!this.currentLock) {
        this.currentLock = this.wakeLock.request("screen");
        this.currentLock.then(
          v => {
            this.keepAlive$.next('active');
            v.addEventListener("release", () => {
              this.currentLock = undefined;
              this.keepAlive$.next(undefined);
            });
          },
          e => {
            console.log('Sentinel rejected', e);
            this.keepAlive$.next('error');
            this.currentLock = undefined;
          }
        );
      }
    }
  }

  release(): void {
    if (this.wakeLock && this.currentLock) {
      this.currentLock.then(v => v.release());
    }
  }

  private refreshTimer(): void {
    this.stopCrono$.next();
    timer(this.cronoMinutesTimeout * 60 * 1000)
      .pipe(takeUntil(this.stopCrono$))
      .subscribe(() => this.release());
  }
}

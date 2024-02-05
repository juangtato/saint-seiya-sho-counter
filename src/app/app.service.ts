import { DestroyRef, Injectable, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Gameplay } from './model/gameplay';
import { GameplayFormGroup } from './model/gameplay-form';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private readonly gameplayStoreKey = 'sss-gameplay';
  private readonly rotatedBoardKey = 'sss-rotatedBoard';

  private nfb = inject(NonNullableFormBuilder)

  gameplayForm(destroyRef: DestroyRef): GameplayFormGroup {
    const result = this.nfb.group({
      leftPlayer: this.playerBoardForm(),
      rightPlayer: this.playerBoardForm()
    }, {
      updateOn: 'blur'
    });
    const previous = this.restoreGameplay();
    if (previous) {
      result.setValue(previous);
    }
    result.valueChanges.pipe(takeUntilDestroyed(destroyRef)).subscribe(
      () => {
        if (result.valid) {
          this.saveGameplay(result.getRawValue());
        }
      }
    );
    return result;
  }

  isRotated(): boolean {
    return localStorage.getItem(this.rotatedBoardKey) === 'true';
  }

  setRotated(value: boolean): void {
    localStorage.setItem(this.rotatedBoardKey, `${value}`);
  }

  reset(): void {
    localStorage.removeItem(this.gameplayStoreKey);
  }

  d6(): number {
    return Math.ceil(Math.random() * 6);
  }

  private playerBoardForm() {
    return this.nfb.group({
      life: [20, [Validators.min(0)]],
      cosmo: [0, [Validators.min(0), Validators.max(9)]],
      armor: [0, [Validators.min(0), Validators.max(9)]],
      depletion: [0, [Validators.min(0), Validators.max(9)]]
    });
  }

  private saveGameplay(data: Gameplay): void {
    localStorage.setItem(this.gameplayStoreKey, JSON.stringify(data));
  }

  private restoreGameplay(): Gameplay | undefined {
    const raw = localStorage.getItem(this.gameplayStoreKey);
    return raw ? JSON.parse(raw) : undefined;
  }
}

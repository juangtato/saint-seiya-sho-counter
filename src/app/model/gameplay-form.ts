import { FormControl, FormGroup } from '@angular/forms';

export type PlayerBoardFormGroup = FormGroup<{
  life: FormControl<number>;
  cosmo: FormControl<number>;
  armor: FormControl<number>;
  depletion: FormControl<number>;
}>;

export type GameplayFormGroup = FormGroup<{
  leftPlayer: PlayerBoardFormGroup;
  rightPlayer: PlayerBoardFormGroup;
}>;

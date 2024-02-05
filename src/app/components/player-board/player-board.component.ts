import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PlayerBoardFormGroup } from '../../model/gameplay-form';
import { VerticalCounterComponent } from './vertical-counter/vertical-counter.component';

@Component({
  selector: 'app-player-board',
  standalone: true,
  imports: [
    VerticalCounterComponent
  ],
  templateUrl: './player-board.component.html',
  styleUrl: './player-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerBoardComponent {

  @Input({ required: true })
  playerBoard!: PlayerBoardFormGroup;
}

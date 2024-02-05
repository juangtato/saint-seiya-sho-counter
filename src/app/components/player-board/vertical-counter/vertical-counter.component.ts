import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AbstractCounterComponent } from '../../../core/component/abstract-counter-component';
import { PlayerBoard } from '../../../model/gameplay';


@Component({
  selector: 'app-vertical-counter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './vertical-counter.component.html',
  styleUrl: './vertical-counter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalCounterComponent extends AbstractCounterComponent {

  @Input({ required: true })
  @HostBinding('attr.class')
  decoration!: keyof (PlayerBoard);

}

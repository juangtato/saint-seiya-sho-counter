import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostBinding,
  OnInit,
  inject
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { PlayerBoardComponent } from './components/player-board/player-board.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { AwakeService } from './service/awake.service';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterOutlet,
    MatIconModule,
    PlayerBoardComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  private destroyRef = inject(DestroyRef);
  private appService = inject(AppService);
  private breakpointObserver = inject(BreakpointObserver);

  @HostBinding('class.portrait')
  portraitMode = false;

  @HostBinding('class.rotatedBoard')
  rotated = this.appService.isRotated();

  form = this.appService.gameplayForm(this.destroyRef);
  keepAlive$ =  inject(AwakeService).keepAlive$

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.WebPortrait,
      Breakpoints.TabletPortrait,
      Breakpoints.HandsetPortrait
    ]).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(v => this.portraitMode = v.matches);
  }

  d6(): void {
    alert(this.appService.d6());
  }

  toggleRotated(): void {
    this.rotated = !this.rotated;
    this.appService.setRotated(this.rotated);
  }

  reset(): void {
    if (confirm('¿Reiniciar partida?')) {
      this.appService.reset();
      this.form.reset();
    }
  }
}

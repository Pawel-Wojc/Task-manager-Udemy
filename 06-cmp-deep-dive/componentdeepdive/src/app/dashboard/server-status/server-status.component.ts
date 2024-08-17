import {
  Component,
  DestroyRef,
  inject,
  OnChanges,
  OnDestroy,
  OnInit,
  signal,
  effect,
} from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})
export class ServerStatusComponent implements OnInit {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');

  constructor() {
    effect(() => {
      console.log(this.currentStatus());
    });
  }

  ngOnInit() {
    // this.interval =
    const interval = setInterval(() => {
      const rnd = Math.random();
      if (rnd < 0.3) {
        this.currentStatus.set('online');
      } else if (rnd < 0.6) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 3000);

    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    });
  }

  //private interval?: ReturnType<typeof setInterval>
  // ngOnDestroy(): void {
  //   clearInterval(this.interval)
  //   // clearing the interval
  // }

  private destroyRef = inject(DestroyRef);
}

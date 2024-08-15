import { Component, DestroyRef, inject, OnChanges, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit {
  currentStatus: 'online' | 'offline' | 'unknown' = 'offline';
  constructor() { }

  ngOnInit() {
    // this.interval = 
    const interval = setInterval(() => {
      const rnd = Math.random();
      if (rnd < 0.3) {
        this.currentStatus = 'online';
      } else if (rnd < 0.6) {
        this.currentStatus = 'offline';
      } else {
        this.currentStatus = 'unknown';
      }
    }, 3000)

    this.destroyRef.onDestroy(() => {
      clearInterval(interval)
    })
  }

  //private interval?: ReturnType<typeof setInterval>
  // ngOnDestroy(): void {
  //   clearInterval(this.interval)
  //   // clearing the interval 
  // }

  private destroyRef  = inject(DestroyRef);
}

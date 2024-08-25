import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  private destroyRef = inject(DestroyRef);

  clickCount$ = toObservable(this.clickCount); // converting signal to observable another way

  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 20 }); // converting observable to signal

  customInterval$ = new Observable((subscriber) => {
    let timesExecuted = 0;
    const interval = setInterval(() => {
      //subscriber.error();
      if (timesExecuted > 3) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('emiting new value..');
      subscriber.next({ messahe: 'New value' });
      timesExecuted++;
    }, 2000);
  }); // custom observable

  constructor() {
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times.`);
    // });
    // toObservable(this.clickCount).subscribe((val) => {
    //   //converting signal to observable
    //   console.log(`Clicked button ${val} times.`);
    // });
  }

  ngOnInit(): void {
    this.customInterval$.subscribe({
      next: (val) => {
        console.log(val);
      },
      complete: () => console.log('complete'),
    }); //using custom observable

    const subscription = this.clickCount$.subscribe({
      next: (val) => console.log(`Clicked button ${this.clickCount()} times.`),
    });

    // const subscriptionion = interval(1000)
    //   .pipe(map((val) => val * val))
    //   .subscribe({
    //     next: (val) => {
    //       console.log(val);
    //     },
    //   });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onClick() {
    this.clickCount.set(this.clickCount() + 1);
  }
}

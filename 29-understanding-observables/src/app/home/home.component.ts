import { Component, OnInit, OnDestroy } from '@angular/core';

import { interval, Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObserverSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObserverSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // })

    const customIntervalObservable = Observable.create(observer => {
      let count = 0;

      setInterval(() => {
        observer.next(count);

        if (count === 5) {
          observer.complete();
        }

        if (count > 3) {
          observer.error(new Error('Round is greater than 3!'));
        }

        count++;
      }, 1000);
    });

    this.firstObserverSubscription = customIntervalObservable.pipe(filter(data => {
      return data > 0;
    }), map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    }, () => {
      console.log('Completed!');
    });
  }

  ngOnDestroy(): void {
    this.firstObserverSubscription.unsubscribe();
  }
}

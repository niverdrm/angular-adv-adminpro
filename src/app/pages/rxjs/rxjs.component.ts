import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnInit, OnDestroy {
  intervalSubs: Subscription;

  constructor() {
    // this.retornaObservable()
    //   .pipe(retry(1))
    //   .subscribe(
    //     (valor) => console.log('subcribe', valor),
    //     (error) => console.warn('error', error),
    //     () => console.info('obs terminado')
    //   );
    this.intervalSubs = this.retornaIntervalo().subscribe((valor) => {
      console.log(valor);
    });
  }

  retornaIntervalo(): Observable<number> {
    return interval(500).pipe(
      // take(10),
      map((valor) => valor + 1),
      filter((valor) => (valor % 2 === 0 ? true : false))
    );
  }

  retornaObservable() {
    let i = -1;

    const obs$ = new Observable<number>((observe) => {
      const intervalo = setInterval(() => {
        i++;
        observe.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observe.complete();
        }
        if (i === 2) {
          observe.error('i llego a 2');
        }
      }, 1000);
    });
    return obs$;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }
}

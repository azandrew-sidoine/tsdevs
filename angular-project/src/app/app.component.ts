import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { from, interval, Observable, Subject } from 'rxjs';
import {
  filter,
  first,
  isEmpty,
  map,
  mergeAll,
  reduce,
  scan,
  take,
  takeLast,
  takeUntil,
  takeWhile,
  tap,
  toArray,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { TodoService } from './views/todo/todo.service';

function filterMap(
  filterCallback: (value: number) => boolean,
  mapCallback?: (value: number) => any
) {
  return (source: Observable<number>) =>
    mapCallback
      ? source.pipe(filter(filterCallback), map(mapCallback))
      : source.pipe(filter(filterCallback));
}

const LIMIT = 20000;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // providers: [TodoService],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'angular-starter-project';
  appName: string = 'TOO LIST APP';
  // Sujet de destruction
  _destroy$ = new Subject();

  constructor(private service: TodoService) {}

  async ngOnInit() {
    const list$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    list$
      .pipe(
        mergeAll(),
        filterMap((state) => state % 2 === 0),
        // map((state) => state * 10),
        // filter((state) => state % 3 === 0),
        // reduce((carr, curr) => {
        //   carr += curr;
        //   return carr;
        // }, 0),
        // first(),
        // take(1),
        // takeWhile((state) => state > 30),
        // takeLast(2),
        toArray()
        // isEmpty()
      )
      .subscribe((value) => console.log(value));

    this.service.todos$.subscribe((todos) => console.log(todos));
  }

  ngAfterViewInit(): void {
    // Méthode appelé après initialization de la vue
  }

  trackByItems(index: number, item: { [index: string]: any }): string {
    return item.lastname;
  }

  onClick() {
    console.log('TODO LIST CLICKED');
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }
}

// todoListParam: { title: string } = { title: 'TODO LIST HEADER' };

// public showPrimaryButton = false;

// public paragraphStyle = {
//   fontSize: '24px',
//   fontWeight: 'bold',
//   lineHeight: '1.5rem',
// };

// public showParagraph = false;

// public users: { [index: string]: any }[] = [
//   {
//     name: 'GHISLAIN',
//     lastname: 'KOUDJRAMASSAN',
//     university: 'UNIVERSITE DE LOME',
//     fac: 'CIC',
//   },
//   {
//     name: 'CODJOVI GUILLAUME',
//     lastname: 'HOUNKPATI',
//     university: 'IAI',
//     fac: "SYSTEM D'INFORMATION",
//   },
// ];

// today = new Date();

// talkObservable$ = new Observable<string>((observer) => {
//   let index = 0;
//   const interval = setInterval(() => {
//     ++index;
//     // Production de la donnée
//     observer.next(`Talking for the ${index} time!`);
//   }, 1000);

//   const timeout = setTimeout(() => {
//     observer.next('Talking for the last time!');
//     // Cloturer la production
//     observer.complete();
//     clearTimeout(timeout);
//     clearInterval(interval);
//   }, 10000);
// });

// // Création d'un suject
// endTalkSubject$ = new Subject();

// talkObservable2$ = interval(1000).pipe(
//   takeUntil(this.endTalkSubject$),
//   tap((state) => {
//     if (state >= 10) {
//       this.endTalkSubject$.next();
//     }
//   }),
//   map((state) => `Talking for the ${state} time!`)
// );

// private _numberOfSubscribers = 0;

// numberOrSubsribers$ = interval(0.3).pipe(
//   takeWhile((state) => this._numberOfSubscribers <= LIMIT),
//   map((_) => ++this._numberOfSubscribers)
// );

// fetchFromDatabase() {
//   return new Promise<string>((success, error) => {
//     const timeout = setTimeout(() => {
//       success(`Data from the database`);
//       clearTimeout(timeout);
//     }, 5000);
//   });
// }

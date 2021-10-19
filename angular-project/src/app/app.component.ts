import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { map, takeUntil, takeWhile, tap } from 'rxjs/operators';

const LIMIT = 20000;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'angular-starter-project';
  appName: string = 'TOO LIST APP';

  todoListParam: { title: string } = { title: 'TODO LIST HEADER' };

  public showPrimaryButton = false;

  public paragraphStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    lineHeight: '1.5rem',
  };

  public showParagraph = false;

  public users: { [index: string]: any }[] = [
    {
      name: 'GHISLAIN',
      lastname: 'KOUDJRAMASSAN',
      university: 'UNIVERSITE DE LOME',
      fac: 'CIC',
    },
    {
      name: 'CODJOVI GUILLAUME',
      lastname: 'HOUNKPATI',
      university: 'IAI',
      fac: "SYSTEM D'INFORMATION",
    },
  ];

  today = new Date();

  talkObservable$ = new Observable<string>(observer => {
    let index = 0;
    const interval = setInterval(() => {
      ++index;
      // Production de la donnée
      observer.next(`Talking for the ${index} time!`);
    }, 1000);

    const timeout = setTimeout(() => {
      observer.next("Talking for the last time!");
      // Cloturer la production
      observer.complete();
      clearTimeout(timeout);
      clearInterval(interval);
    }, 10000);
  });

  // Création d'un suject
  endTalkSubject$ = new Subject();

  talkObservable2$ =  interval(1000).pipe(
    takeUntil(this.endTalkSubject$),
    tap(state => {
      if (state >= 10) {
        this.endTalkSubject$.next();
      }
    }),
    map(state => `Talking for the ${state} time!`),
  );

  private _numberOfSubscribers = 0;

  numberOrSubsribers$ = interval(.3).pipe(
    takeWhile(state => this._numberOfSubscribers <= LIMIT),
    map(_ => ++this._numberOfSubscribers),
  );

  async ngOnInit() {

    // Souscription a la production de la donnée
    // this.talkObservable$.subscribe(value => console.log(value));

    // this.talkObservable2$.subscribe(value => console.log(value));
  }

  ngAfterViewInit(): void {
    // Méthode appelé après initialization de la vue
  }

  fetchFromDatabase() {
    return new Promise<string>((success, error) => {
      const timeout = setTimeout(() => {
        success(`Data from the database`);
        clearTimeout(timeout);
      }, 5000);

      // const timeout2 = setTimeout(() => {
      //   error(new Error('Error While fetching from database'));
      //   clearTimeout(timeout2);
      // }, 3000)
    });
  }

  trackByItems(index: number, item: { [index: string]: any }): string {
    return item.lastname;
  }

  onClick() {
    console.log('TODO LIST CLICKED');
  }

  ngOnDestroy(): void {}
}

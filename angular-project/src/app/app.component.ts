import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  title = 'angular-starter-project';
  appName: string = 'TOO LIST APP';

  todoListParam: {title: string} =  {title: 'TODO LIST HEADER'};

  async ngOnInit() {
    // try {
    //   this.title = await this.fetchFromDatabase();
    // } catch (error) {
    //   console.error(error);
    // }
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


  onClick() {
    console.log('TODO LIST CLICKED');
  }

  ngOnDestroy(): void {
  }
}

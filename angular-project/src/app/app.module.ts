import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AppComponent } from './app.component';
import { UnlessDirective } from './views/partials/directives/unless.directive';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangeTextOnHoverDirective } from './views/partials/directives/change-text.directive';
import { CasePipe } from './views/partials/pipes/uppercase.pipe';
import { CardComponent } from './views/partials/card/card.component';
import { CardContentComponent } from './views/partials/card/card-content/card-content.component';
import { CardTitleComponent } from './views/partials/card/card-title/card-title.component';
import { CardFooterComponent } from './views/partials/card/card-footer/card-footer.component';
import { TodosModule } from './views/todo/todos.module';
import { TODO_SERVICE } from './views/todo/constants';
import { TodoService } from './views/todo/todo.service';
import { AuthTokenInterceptorService } from './core/auth';
import {
  HTTP_CLIENT,
  HttpClientModule as CoreHttpClientModule,
} from './core/http';

@NgModule({
  declarations: [
    AppComponent,
    UnlessDirective,
    ChangeTextOnHoverDirective,
    CasePipe,
    CardComponent,
    CardContentComponent,
    CardTitleComponent,
    CardFooterComponent,
  ],
  imports: [
    TodosModule.forRoot(),
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreHttpClientModule.forRoot(),
  ],
  providers: [
    {
      provide: TODO_SERVICE,
      useClass: TodoService,
    },
    {
      // HTTP_INTERCEPTORS
      // APP_INITIALIZER
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptorService,
      multi: true,
    },
    // {
    //   provide: HTTP_CLIENT,
    //   useClass: HttpClient,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

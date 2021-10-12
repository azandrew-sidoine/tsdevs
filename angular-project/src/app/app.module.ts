import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UnlessDirective } from './views/partials/unless.directive';
import { TodoListComponent } from './views/todo/todo-list/todo-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UnlessDirective,
    TodoListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

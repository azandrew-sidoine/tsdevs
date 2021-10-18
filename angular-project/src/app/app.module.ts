import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UnlessDirective } from './views/partials/directives/unless.directive';
import { TodoListComponent } from './views/todo/todo-list/todo-list.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangeTextOnHoverDirective } from './views/partials/directives/change-text.directive';
import { CasePipe } from './views/partials/pipes/uppercase.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UnlessDirective,
    TodoListComponent,
    ChangeTextOnHoverDirective,
    CasePipe
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

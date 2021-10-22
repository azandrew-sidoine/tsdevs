import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

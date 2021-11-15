import { CommonModule, DOCUMENT } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { TodoDetailComponent } from './todos/todo-detail/todo-detail.component';
import { TodoInputComponent } from './todos/todo-input/todo-input.component';
import { TodoListComponent } from './todos/todo-list.component';
import { TodoViewComponent } from './todos/todo-view/todo-view.component';
// import { TodoService, TodoServiceV2 } from './todo.service';
// import { TodoService as TodoServiceInterface } from './contracts/todo';
// import { TODO_SERVICE } from './constants';

@NgModule({
  // Déclaration des élements vue du module
  declarations: [
    TodoListComponent,
    TodoDetailComponent,
    TodoInputComponent,
    TodoViewComponent,
  ],

  // Importation d'autre modules
  imports: [
    // ... Liste des modules à importer
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
  ],

  // Les exporations
  exports: [TodoListComponent],

  // Déclaration des services
  providers: [],

  // Les éléments de la vue à charger lorsque le module est initialisé par le framework
  entryComponents: [
    // ...
  ],
})
export class TodosModule {
  static forRoot(): ModuleWithProviders<TodosModule> {
    return {
      ngModule: TodosModule,
      providers: [
        // Fourni le service par défaut
        // TodoService,
        // Fourni le serive par création
        // {
        //   provide: TodoService,
        //   useFactory: (injector: Injector) => {
        //     const { defaultView } = injector.get(DOCUMENT);
        //     return new TodoService(defaultView ?? undefined);
        //   },
        //   deps: [Injector],
        // },
        // Fourni le service par implémentation
        // {
        //   provide: TODO_SERVICE,
        //   useClass: TodoService,
        // },
      ],
    };
  }
}

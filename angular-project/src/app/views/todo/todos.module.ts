import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { TodoInputComponent } from './todo-list/todo-input/todo-input.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoViewComponent } from './todo-list/todo-view/todo-view.component';
import { TodoService } from './todo.service';

@NgModule({
  // Déclaration des élements vue du module
  declarations: [TodoListComponent, TodoInputComponent, TodoViewComponent],

  // Importation d'autre modules
  imports: [
    // ... Liste des modules à importer
    CommonModule,
    FormsModule,
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
      providers: [TodoService],
    };
  }
}

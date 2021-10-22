import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoService } from './todo.service';

@NgModule({
  // Déclaration des élements vue du module
  declarations: [TodoListComponent],

  // Importation d'autre modules
  imports: [
    // ... Liste des modules à importer
    CommonModule,
    FormsModule,
    ClarityModule
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
        TodoService
      ]
    };
  }
}

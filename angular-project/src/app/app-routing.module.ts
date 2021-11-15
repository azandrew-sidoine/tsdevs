import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { App404Component } from './views/404/404.component';
import { AboutComponent } from './views/about/about.component';
import { TodoDetailComponent } from './views/todo/todos/todo-detail/todo-detail.component';
import { TodoListComponent } from './views/todo/todos/todo-list.component';

const ROUTES: Routes = [
  // Règle de navigation par redirection
  // Note: Définir cette rêgle avant tout autre règle
  {
    // Chemin vers lequel nous navigons
    path: '',
    // Chemin de redirection
    redirectTo: 'todos',
    // Règle de correspondance
    pathMatch: 'full',
  },
  // Chemin vers composant todos
  {
    path: 'todos',
    component: TodoListComponent,
  },
  {
    path: 'todos/:id',
    component: TodoDetailComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  // Chemin vers lequel l'utilisateur est navigué si aucun chemin n'est correspondant
  // Note: Cette règle doit toujours et toujours être le dernier élement
  // dans votre configuration
  {
    path: '**',
    component: App404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Todo } from 'src/app/bloc/models/task';
import { TODO_SERVICE } from '../../constants';
import { TodoService } from '../../contracts/todo';

@Component({
  selector: 'todo-detail',
  templateUrl: './todo-detail.component.html',
  styles: [
    `
      .todo-detail-container {
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
})
export class TodoDetailComponent implements OnInit {
  todo!: Todo | undefined;

  constructor(
    // Service permettant de récupérer des informations du chemin courant
    // dans le module de gestion de navigation
    private route: ActivatedRoute,
    @Inject(TODO_SERVICE) private service: TodoService
  ) {}

  ngOnInit(): void {
    // Récupération des paramètres dans le ActivatedRoute Service
    const id = +this.route.snapshot.params['id'];
    this.service.todos$
      .pipe(
        tap((todos) => {
          this.todo = todos.find((todo) => +todo.id === id);
        })
      )
      .subscribe();
  }
}

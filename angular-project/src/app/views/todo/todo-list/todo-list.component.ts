import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { tap } from 'rxjs/operators';
import { Todo } from 'src/app/bloc/models/task';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  // providers: [
  //   TodoService
  // ]
})
export class TodoListComponent implements OnInit, OnChanges {
  public todos$ = this.service.todos$.pipe(
    tap((state) => console.log('TODO STATE: ', state))
  );
  public uistate$ = this.service.uiState$;
  public today = new Date();

  // Model binded to ngModel
  label!: string;

  // #region Listeners
  @HostListener('keyup.enter')
  onKeyPress(event: string) {
    if (this.label && this.label !== '') {
      this.onAddButtonClick();
    }
  }
  // #endregion Listeners

  constructor(private service: TodoService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  async onTodoCompletedChange(element: Todo, value: boolean) {
    console.log('UPDATING :', element?.id);
    // UPDATE TODO ELEMENT
    await this.service
      .update(element.id, {
        completedAt: new Date(),
        completed: true,
      })
      .toPromise();
  }

  async onAddButtonClick() {
    // TODO: Ouvrir un modal d'ajout
    if (this.label && this.label !== '') {
      await this.service
        .create({
          label: this.label,
        })
        .toPromise();
      this.label = '';
    }
  }
}

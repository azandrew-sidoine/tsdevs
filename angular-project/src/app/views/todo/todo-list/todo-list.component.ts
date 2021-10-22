import {
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { tap } from 'rxjs/operators';
import { Todo } from 'src/app/bloc/models/task';
import { UI_STATE_MANAGER } from 'src/app/core/ui-state/constants';
import { UIStateManager } from 'src/app/core/ui-state/contracts/ui-state-service';
import { TODO_SERVICE } from '../constants';
import { TodoService } from '../contracts/todo';

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
  public uistate$ = this.uiState.uiState$;
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

  constructor(
    @Inject(TODO_SERVICE) private service: TodoService,
    @Inject(UI_STATE_MANAGER) private uiState: UIStateManager
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  async onTodoCompletedChange(element: Todo, value: boolean) {
    console.log('UPDATING :', element?.id);
    // UPDATE TODO ELEMENT
    await this.service
      .update(element.id, {
        completedAt: value === false ? undefined : new Date(),
        completed: value,
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

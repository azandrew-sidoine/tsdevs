import {
  Component,
  HostListener,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/app/bloc/models/task';
import { UI_STATE_MANAGER } from 'src/app/core/ui-state/constants';
import { UIStateManager } from 'src/app/core/ui-state/contracts/ui-state-service';
import { TODO_SERVICE } from '../constants';
import { TodoService } from '../contracts/todo';
import { DateValidators } from 'src/app/core/utils/validators/date';
import { substractDate } from 'src/app/core/utils/helpers';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnChanges {
  public todos$ = this.service.todos$.pipe();
  public uistate$ = this.uiState.uiState$;

  // Model binded to ngModel
  label!: string;

  // #region Listeners
  @HostListener('keyup.enter')
  onKeyPress(event: string) {
    // Vérifier si le formulaire est valide
    if (this.model.valid) {
      this.onAddButtonClick();
    }
  }
  // #endregion Listeners

  model: FormGroup = this.builder.group({
    label: [
      undefined,
      Validators.compose([Validators.required, Validators.maxLength(45)]),
    ],
    createdAt: [
      undefined,
      Validators.compose([
        Validators.required,
        DateValidators.after(substractDate()),
      ]),
    ],
  });

  constructor(
    @Inject(TODO_SERVICE) private service: TodoService,
    @Inject(UI_STATE_MANAGER) private uiState: UIStateManager,
    private builder: FormBuilder
  ) {}

  async ngOnInit() {
    await lastValueFrom(this.service.getTodos$());
  }

  ngOnChanges(changes: SimpleChanges): void {}

  async onTodoCompletedChange(element: Todo, value: boolean) {
    // UPDATE TODO ELEMENT
    await lastValueFrom(
      this.service.update(element.id, {
        completedAt: value === false ? undefined : new Date(),
        completed: value,
      })
    );
  }

  async onDeleteTodo(todo: Todo | undefined) {
    if (todo) {
      await lastValueFrom(this.service.delete(todo?.id));
    }
  }

  async onAddButtonClick() {
    // TODO: Ouvrir un modal d'ajout
    // Validate the form
    Object.keys(this.model.controls).forEach((key) => {
      this.model.get(key)?.markAsDirty();
      this.model.get(key)?.markAsTouched();
    });
    if (this.model.valid) {
      await this.service.create(this.model.getRawValue()).toPromise();
      this.model.reset();
    }
  }
}

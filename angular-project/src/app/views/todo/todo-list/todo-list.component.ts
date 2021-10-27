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

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnChanges {
  public todos$ = this.service.todos$;
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
      Validators.compose([Validators.required, Validators.maxLength(20)]),
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

  ngOnInit() {
    // timeout(() => {
    //   this.model.markAllAsTouched();
    //   this.model.get('label')?.markAsDirty();
    //   this.model.get('label')?.markAsTouched();
    // }, 2000);
  }

  ngOnChanges(changes: SimpleChanges): void {}

  async onTodoCompletedChange(element: Todo, value: boolean) {
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

import {
  ChangeDetectionStrategy,
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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Todo } from 'src/app/bloc/models/task';
import { timeout } from 'src/app/core/rx';
import { UI_STATE_MANAGER } from 'src/app/core/ui-state/constants';
import { UIStateManager } from 'src/app/core/ui-state/contracts/ui-state-service';
import { TODO_SERVICE } from '../constants';
import { TodoService } from '../contracts/todo';
import { TodoInputModel } from '../contracts/model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
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
  @Input() model: TodoInputModel = {};

  model$: FormGroup = this.builder.group(
    {
      label: [
        'SE PRÉPARER',
        Validators.compose([Validators.required, Validators.maxLength(20)]),
      ],
      createdAt: [{ value: undefined, disabled: true }, Validators.required],
    },
    {
      updateOn: 'submit',
    }
  );

  constructor(
    @Inject(TODO_SERVICE) private service: TodoService,
    @Inject(UI_STATE_MANAGER) private uiState: UIStateManager,
    private builder: FormBuilder
  ) {}

  ngOnInit() {
    timeout(() => {
      // this.model.label = 'ALLER AU RESTAURANT';
      // this.model.createdAt = new Date();
      this.model = {
        label: 'ALLER AU RESTAURANT',
        createdAt: new Date(),
      } as TodoInputModel;
    }, 2000);
  }

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

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoInputComponent {
  @Input() label!: string;
  @Output() labelChange = new EventEmitter<string>();
  @Input() performingAction!: boolean | undefined;
  // @Input() model: TodoInputModel = {};
  @Input() model!: FormGroup;
}

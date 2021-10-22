import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
})
export class TodoInputComponent {
  @Input() label!: string;
  @Output() labelChange = new EventEmitter<string>();
  @Input() performingAction!: boolean | undefined;
}

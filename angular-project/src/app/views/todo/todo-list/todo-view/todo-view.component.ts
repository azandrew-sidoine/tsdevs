import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Todo } from 'src/app/bloc/models/task';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.scss'],
})
export class TodoViewComponent implements OnChanges {
  @Input() todo!: Todo;
  @Input() completed!: boolean;
  @Output() completedChange = new EventEmitter<boolean>();

  onCompletedModelChange(event: boolean) {
    this.completedChange.emit(event);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const todo = changes['todo'];
    const currentValue = todo.currentValue as Todo;
    const previousValue = todo.previousValue as Todo;
    if (previousValue && currentValue.completed !== previousValue?.completed) {
      this.completed = currentValue.completed;
    } else {
      this.completed = currentValue.completed;
    }
  }
}

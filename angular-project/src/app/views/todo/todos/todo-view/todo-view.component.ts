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
  @Output() deleteEvent = new EventEmitter<Todo | undefined>();
  @Output() elementClicked = new EventEmitter<Todo | undefined>();

  onCompletedModelChange(event: boolean) {
    this.completedChange.emit(event);
  }

  onDeleteTodo(event: Todo | undefined) {
    this.deleteEvent.emit(event);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const todo = changes['todo'];
    const currentValue = todo.currentValue as Todo;
    this.completed = currentValue.completed;
  }
}

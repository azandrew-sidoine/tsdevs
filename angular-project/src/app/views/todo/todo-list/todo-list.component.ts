import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnChanges {
  @Input() param!: { title: string };
  @Output() paramChange = new EventEmitter<{ title: string }>();

  ngOnInit(): void {
    setTimeout(() => {
      this.paramChange.emit({ title: 'TODO LIST HEADER CHANGED' });
    }, 3000);
  }

  ngOnChanges(changes: SimpleChanges): void {}
}

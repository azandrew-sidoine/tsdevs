import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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
  public todos$ = this.service.todos$;
  public uistate$ = this.service.uiState$;
  public today = new Date();

  // Model binded to ngModel
  label!: string | undefined;

  constructor(private service: TodoService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  async onAddButtonClick() {
    // TODO: Ouvrir un modal d'ajout
    await this.service
      .create({
        label: this.label,
      })
      .toPromise();
    this.label = undefined;
  }
}

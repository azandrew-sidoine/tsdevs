import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoInputComponent implements OnInit {
  @Input() performingAction!: boolean | undefined;
  @Input() model!: FormGroup;

  ngOnInit(): void {}
}

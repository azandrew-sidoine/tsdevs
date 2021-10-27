import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, from, ReplaySubject } from 'rxjs';
import { filter, mergeAll, startWith, toArray } from 'rxjs/operators';
import { Todo } from 'src/app/bloc/models/task';
import { UI_STATE_MANAGER } from 'src/app/core/ui-state/constants';
import { UIStateType } from 'src/app/core/ui-state/contracts/ui-state';
import { UIStateManager } from 'src/app/core/ui-state/contracts/ui-state-service';
import { TodoService as TodoServiceInterface } from './contracts/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoServiceV2 implements TodoServiceInterface {
  private _todos$ = new BehaviorSubject<Todo[]>([]);

  // SELECT LIST OF TODOS
  public readonly todos$ = this._todos$.pipe(startWith([] as Todo[]));

  // List of completed todos
  public readonly completedTodos = this.todos$.pipe(
    mergeAll(),
    filter((todo) => todo.completed !== false),
    toArray()
  );

  create(task: Partial<Todo>) {
    return from(
      new Promise<boolean>((resolve, reject) => {
        resolve(true);
      })
    );
  }

  update(id: number | string, todo: Partial<Todo>) {
    return from(
      new Promise<boolean>((resolve, reject) => {
        resolve(true);
      })
    );
  }

  delete(id: number | string) {
    return from(
      new Promise<boolean>((resolve, reject) => {
        resolve(true);
      })
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class TodoService implements TodoServiceInterface {
  private _todos$ = new BehaviorSubject<Todo[]>([]);

  // SELECT LIST OF TODOS
  public readonly todos$ = this._todos$.pipe(startWith([] as Todo[]));

  // List of completed todos
  public readonly completedTodos = this.todos$.pipe(
    mergeAll(),
    filter((todo) => todo.completed !== false),
    toArray()
  );

  constructor(@Inject(UI_STATE_MANAGER) private uiState: UIStateManager) {}

  create(task: Partial<Todo>) {
    return from(
      new Promise<boolean>((resolve, reject) => {
        const timeout = setTimeout(() => {
          // Insert The task to the database
          const task_ = {
            label: task?.label ?? 'UNKNOW',
            id: new Date().getMilliseconds(),
            completed: false,
            createdAt: task?.createdAt ? new Date(task?.createdAt) : new Date(),
            completedAt: undefined,
          };
          this._todos$.next([...this._todos$.getValue(), ...[task_]]);
          this.uiState.endAction(UIStateType.OK);
          resolve(true);
          clearTimeout(timeout);
        }, 1000);
      })
    );
  }

  update(id: number | string, todo: Partial<Todo>) {
    return from(
      new Promise<boolean>((resolve, reject) => {
        this.uiState.startAction('UPDATING TODO');
        const timeout = setTimeout(() => {
          const cache = this._todos$.getValue();
          let index = cache.findIndex((todo) => +todo.id === +id);
          if (index !== -1) {
            const _todo = {
              ...cache[index],
              ...todo,
            };
            cache[index] = _todo;
            this._todos$.next([...cache]);
            this.uiState.endAction(UIStateType.OK);
            resolve(true);
          } else {
            this.uiState.endAction(UIStateType.WARNING);
            resolve(false);
          }
          clearTimeout(timeout);
        }, 1000);
      })
    );
  }

  delete(id: number | string) {
    return from(
      new Promise<boolean>((resolve, reject) => {
        this.uiState.startAction('DELETING TODO');
        const timeout = setTimeout(() => {
          const cache = this._todos$.getValue();
          let index = cache.findIndex((todo) => +todo.id === +id);
          if (index !== -1) {
            delete cache[index];
            this._todos$.next([...cache]);
            this.uiState.endAction(UIStateType.OK);
            resolve(true);
          } else {
            this.uiState.endAction(UIStateType.WARNING);
            resolve(false);
          }
          clearTimeout(timeout);
        }, 1000);
      })
    );
  }
}

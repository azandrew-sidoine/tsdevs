import { Injectable } from '@angular/core';
import { BehaviorSubject, from, ReplaySubject } from 'rxjs';
import { filter, mergeAll, startWith, toArray } from 'rxjs/operators';
import { Todo } from 'src/app/bloc/models/task';

type PartialUIState = Partial<{
  performingAction: boolean;
  message: string;
}>;

@Injectable()
export class TodoService {
  private _todos$ = new BehaviorSubject<Todo[]>([]);

  // SELECT LIST OF TODOS
  public readonly todos$ = this._todos$.pipe(startWith([] as Todo[]));

  // List of completed todos
  public readonly completedTodos = this.todos$.pipe(
    mergeAll(),
    filter((todo) => todo.completed !== false),
    toArray()
  );

  public uiState$ = new ReplaySubject<PartialUIState>(1);

  create(task: Partial<Todo>) {
    return from(
      new Promise<boolean>((resolve, reject) => {
        this.uiState$.next({
          performingAction: true,
          message: 'Creating Todo',
        });
        const timeout = setTimeout(() => {
          // Insert The task to the database
          const task_ = {
            label: task?.label ?? 'UNKNOW',
            id: new Date().getMilliseconds(),
            completed: false,
            createdAt: new Date(),
            completedAt: undefined,
          };
          this._todos$.next([...this._todos$.getValue(), ...[task_]]);
          this.uiState$.next({
            performingAction: false,
            message: undefined,
          });
          resolve(true);
          clearTimeout(timeout);
        }, 1000);
      })
    );
  }

  update(id: number | string, todo: Partial<Todo>) {
    return from(
      new Promise<boolean>((resolve, reject) => {
        this.uiState$.next({
          performingAction: true,
          message: 'UPDATING TODO',
        });
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
            resolve(true);
          } else {
            resolve(false);
          }
          this.uiState$.next({
            performingAction: false,
            message: undefined,
          });
          clearTimeout(timeout);
        }, 1000);
      })
    );
  }

  delete(id: number | string) {
    return from(
      new Promise<boolean>((resolve, reject) => {
        const timeout = setTimeout(() => {
          const cache = this._todos$.getValue();
          let index = cache.findIndex((todo) => +todo.id === +id);
          if (index !== -1) {
            delete cache[index];
            this._todos$.next([...cache]);
            resolve(true);
          } else {
            resolve(false);
          }
          clearTimeout(timeout);
        }, 1000);
      })
    );
  }
}

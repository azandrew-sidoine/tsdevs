import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, from, interval, Observable, of } from 'rxjs';
import {
  filter,
  map,
  mergeAll,
  mergeMap,
  startWith,
  take,
  toArray,
} from 'rxjs/operators';
import { Todo } from 'src/app/bloc/models/task';
import { UI_STATE_MANAGER } from 'src/app/core/ui-state/constants';
import { UIStateType } from 'src/app/core/ui-state/contracts/ui-state';
import { UIStateManager } from 'src/app/core/ui-state/contracts/ui-state-service';
import { TodoService as TodoServiceInterface } from './contracts/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService implements TodoServiceInterface {
  private url: string = 'http://localhost:3000/todos';
  private _todos$ = new BehaviorSubject<Todo[]>([]);

  // SELECT LIST OF TODOS
  public readonly todos$ = this._todos$.pipe(startWith([] as Todo[]));

  // List of completed todos
  public readonly completedTodos = this.todos$.pipe(
    mergeAll(),
    filter((todo) => todo.completed !== false),
    toArray()
  );

  constructor(
    private client: HttpClient,
    @Inject(UI_STATE_MANAGER) private uiState: UIStateManager
  ) {}

  getTodos$(): Observable<boolean> {
    return this.client.get(this.url).pipe(
      map((state) => {
        if (state && Array.isArray(state)) {
          this._todos$.next(state as Todo[]);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  create(task: Partial<Todo>) {
    const todo_ = {
      label: task?.label ?? 'UNKNOW',
      id: new Date().getMilliseconds(),
      completed: false,
      createdAt: task?.createdAt ? new Date(task?.createdAt) : new Date(),
      completedAt: undefined,
    };
    return this.client.post(this.url, todo_).pipe(
      map((todo) => {
        if (todo) {
          this._todos$.next([...this._todos$.getValue(), ...[todo as Todo]]);
          this.uiState.endAction(UIStateType.OK);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  update(id: number | string, todo: Partial<Todo>) {
    this.uiState.startAction('UPDATING TODO...');
    const cache = this._todos$.getValue();
    let index = cache.findIndex((todo) => +todo.id === +id);
    if (index !== -1) {
      const todo_ = {
        ...cache[index],
        ...todo,
      };
      return this.client.put<Todo>(`${this.url}/${todo_.id}`, todo_).pipe(
        map((todo) => {
          if (todo) {
            cache[index] = todo;
            this._todos$.next(cache);
            this.uiState.endAction(UIStateType.OK);
            return true;
          } else {
            return false;
          }
        })
      );
    } else {
      this.uiState.endAction(UIStateType.WARNING);
      return of(true);
    }
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

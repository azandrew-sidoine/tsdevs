import { Observable, of } from 'rxjs';
import { Todo } from 'src/app/bloc/models/task';
import { HttpClient } from '../contracts/http-client';

export class HttpClientStub implements HttpClient {
  get<T extends unknown>(
    url: string,
    params?: { [index: string]: any }
  ): Observable<any> {
    return of([
      {
        id: 1,
        label: 'TEST LABEL',
        completed: false,
        createdAt: '2021-11-12T18:28:00',
        completedAt: undefined,
      } as Todo,
    ]);
  }
  post<T extends unknown>(
    url: string,
    body: { [index: string]: any },
    params?: { [index: string]: any }
  ): Observable<any> {
    return of({...body});
  }
  put<T extends unknown>(
    url: string,
    body: { [index: string]: any },
    params?: { [index: string]: any }
  ): Observable<any> {
    return of({ ...body });
  }
  delete<T extends unknown>(
    url: string,
    params?: { [index: string]: any }
  ): Observable<any> {
    return of({});
  }
  request<T extends unknown, K extends unknown>(request: T): Observable<K> {
    throw new Error('Method not implemented.');
  }
}

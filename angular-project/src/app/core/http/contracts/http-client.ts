import { Observable } from 'rxjs';

export interface HttpClient {
  get<T extends any>(
    url: string,
    params?: { [index: string]: any }
  ): Observable<any>;

  post<T extends any>(
    url: string,
    body: {
      [index: string]: any;
    },
    params?: { [index: string]: any }
  ): Observable<any>;

  put<T extends any>(
    url: string,
    body: {
      [index: string]: any;
    },
    params?: { [index: string]: any }
  ): Observable<any>;

  delete<T extends any>(
    url: string,
    params?: { [index: string]: any }
  ): Observable<any>;

  request<T extends any, K extends any>(request: T): Observable<K>;
}

import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuthTokenInterceptorService implements HttpInterceptor, OnDestroy {
  private _destroy$ = new Subject();
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Modifier la requête en passant l'entête d'authorization
    // récupéré depuis le service de gestion des token
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    req = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`
      ),
    });
    // Retrourner la prochaine exécution de la pile des middlewares
    return next
      .handle(req)
      .pipe
      // tap((response) => {
      //   // console.log(response);
      //   // if (response instanceof HttpErrorResponse && response.status === 401) {
      //   //   console.log('Has Authentication error....');
      //   // }
      // }),
      // catchError((err) => {
      //   if (err instanceof HttpErrorResponse && err.status === 401) {
      //     err = { ...err, status: 404 } as HttpErrorResponse;
      //   }
      //   return throwError(() => err);
      // })
      ();
  }

  ngOnDestroy() {}
}

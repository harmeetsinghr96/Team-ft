import {
  HttpInterceptor,
  HttpHandler,
  HttpResponse,
  HttpRequest,
  HttpEvent,
  HttpHeaders
} from '@angular/common/http';

import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as state from '../../_store/store.reducers';

import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { tap } from 'rxjs/operators';
import { LoaderService } from '../../services/shared/loader.service';
import { Router } from '@angular/router';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {

  constructor(private loader: LoaderService, private store$: Store<state.AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store$.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.token;
      }),
      exhaustMap(token => {
        if (!token) {
          const apiReq = req.clone({
            url: `${environment.API_HOST}/${req.url}`,
          });

          return next.handle(apiReq).pipe(
            tap((event) => {
              this.loader.state(true);
              if (event instanceof HttpResponse) {
                this.loader.state(false);
              }
            }, (error) => {
                this.loader.state(false);
              }
            )
          );
        } else {
          const apiReq = req.clone({
            url: `${environment.API_HOST}/${req.url}`,
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + token,
            })
          });

          return next.handle(apiReq).pipe(
            tap((event) => {
              this.loader.state(true);
              if (event instanceof HttpResponse) {
                this.loader.state(false);
              }
            }, (error) => {
                this.loader.state(false);
              }
            )
          );
        }
      })
    );
  }
}

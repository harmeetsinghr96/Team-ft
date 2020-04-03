import {
  HttpInterceptor,
  HttpHandler,
  HttpResponse,
  HttpRequest,
  HttpEvent,
  HttpHeaders
} from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {

  constructor( private loader: LoaderService ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.clone({
      url: `${environment.API_HOST}/${req.url}`,
      // headers: new HttpHeaders({
      //   Authorization: 'Bearer ' + 'token',
      // })
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
}

import { Actions, ofType, Effect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import * as types from '../_actions/types';
import * as AuthActions from '../_actions/auth.actions';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/interfaces/auth-response.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthEffets {
  @Effect()
  Login = this.actions$.pipe(
    ofType(types.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      const data = {
        email: authData.payload.email,
        password: authData.payload.password
      };

      return this.apiService.login(data).pipe(
        map((res: any) => {
          console.log(res);
          return new AuthActions.Login({ user: res.data.user, token: res.data.token });
        }),
        catchError(errorRes => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return of(new AuthActions.LoginFailed(errorMessage));
          }

          if (errorRes.error.error.message) {
            errorMessage = errorRes.error.error.message;
            console.log(errorMessage);
          }
          return of(new AuthActions.LoginFailed(errorMessage));
        })
      );
    }),
  );

  @Effect()
  Register = this.actions$.pipe(
    ofType(types.REGISTER_START),

    switchMap((authData: AuthActions.RegisterStart) => {
      const data = {
        full_name: authData.payload.full_name,
        email: authData.payload.email,
        company_full_name: authData.payload.company_full_name,
        password: authData.payload.password
      };

      return this.apiService.register(data).pipe(
        map((res: any) => {
          return new AuthActions.Register({ id: res.data.id, token: res.data.token });
        }),
        catchError((errorRes) => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return of(new AuthActions.LoginFailed(errorMessage));
          }

          if (errorRes.error.error.message) {
            errorMessage = errorRes.error.error.message;
            console.log(errorMessage);
          }
          return of(new AuthActions.RegisterFailed(errorMessage));
        })
      );
    })
  );

@Effect({ dispatch: false })
authSuccess = this.actions$.pipe(
    ofType(types.LOGIN || types.REGISTER),
    tap(() => {
      this.router.navigate(['/email']);
    })
  );

constructor(private actions$: Actions,
            private http: HttpClient,
            private apiService: ApiService,
            private router: Router) { }


}

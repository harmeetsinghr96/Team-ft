import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import * as types from '../_actions/types';
import * as AuthActions from '../_actions/auth.actions';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Injectable()
export class AuthEffets {

  constructor(private actions$: Actions,
              private apiService: ApiService,
              private router: Router) { }

  @Effect()
  Login = this.actions$.pipe(
    ofType(types.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      let user: User;

      const email = authData.payload.user.email;
      const password = authData.payload.user.password;
      const company_id = authData.payload.user.company_id;

      if (email && password && company_id) {
        user = {email, password, company_id};
      } else {
        user = {email, password};
      }

      return this.apiService.login(user).pipe(
        map((res: any) => {
          console.log(res);
          return new AuthActions.Login({ user: res.data.user, token: res.data.token });
        }),
        catchError(errorRes => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.message) {
            return of(new AuthActions.LoginFailed(errorMessage));
          }

          if (errorRes.error.message) {
            errorMessage = errorRes.error.message;
            return of(new AuthActions.LoginFailed(errorMessage));
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

      const user: User = {
        full_name: authData.payload.user.full_name,
        email: authData.payload.user.email,
        company_full_name: authData.payload.user.company_full_name,
        password: authData.payload.user.password
      };

      return this.apiService.register(user).pipe(
        map((res: any) => {
          return new AuthActions.Register();
        }),
        catchError((errorRes: any) => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.message) {
            return of(new AuthActions.RegisterFailed(errorMessage));
          }

          if (errorRes.error.message) {
            errorMessage = errorRes.error.message;
            return of(new AuthActions.RegisterFailed(errorMessage));
          }
          return of(new AuthActions.RegisterFailed(errorMessage));
        })
      );
    })
  );

  @Effect()
  Forgot = this.actions$.pipe(
    ofType(types.FORGOT_START),

    switchMap((authData: AuthActions.ForgotStart) => {

      const user: User = {
        email: authData.payload.user.email
      };

      return this.apiService.forgot(user).pipe(
        map((res: any) => {
          return new AuthActions.Forgot();
        }),
        catchError((errorRes: any) => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.message) {
            return of(new AuthActions.ForgotFailed(errorMessage));
          }

          if (errorRes.error.message) {
            errorMessage = errorRes.error.message;
            return of(new AuthActions.ForgotFailed(errorMessage));
          }
          return of(new AuthActions.ForgotFailed(errorMessage));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(types.REGISTER),
    tap(() => {
      this.router.navigate(['/registered']);
    })
  );

}

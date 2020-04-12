import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/API/auth.service';

import * as types from '../_actions/_types/auth.type';
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
        user = { email, password, company_id };
      } else {
        user = { email, password };
      }

      return this.apiService.login(user).pipe(
        map((res: any) => {
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
        map((res) => {
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

  @Effect()
  RecoveryPassword = this.actions$.pipe(
    ofType(types.RECOVERY_START),

    switchMap((authData: AuthActions.RecoveryStart) => {

      const user: User = {
        token: authData.payload.user.token,
        id: authData.payload.user.id,
        password: authData.payload.user.password
      };

      return this.apiService.passwordRecovery(user).pipe(
        map((res: any) => {
          return new AuthActions.Recovery();
        }),
        catchError((errorRes: any) => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.message) {
            return of(new AuthActions.RecoveryFailed(errorMessage));
          }

          if (errorRes.error.message) {
            errorMessage = errorRes.error.message;
            return of(new AuthActions.RecoveryFailed(errorMessage));
          }

          return of(new AuthActions.RecoveryFailed(errorMessage));
        })
      );
    })
  );

  @Effect()
  Verification = this.actions$.pipe(
    ofType(types.EMAIL_VERIFICATION_START),

    switchMap((authData: AuthActions.VerificationStart) => {

      const user: User = {
        token: authData.payload.user.token,
        id: authData.payload.user.id
      };

      return this.apiService.verification(user).pipe(
        map((res: any) => {
          console.log(res);
          return new AuthActions.Verification({ user: res.data.user, token: res.data.token });
        }),
        catchError((errorRes: any) => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.message) {
            return of(new AuthActions.VerificationFailed(errorMessage));
          }

          if (errorRes.error.message) {
            errorMessage = errorRes.error.message;
            return of(new AuthActions.VerificationFailed(errorMessage));
          }

          return of(new AuthActions.VerificationFailed(errorMessage));
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

  @Effect({ dispatch: false })
  emailSent = this.actions$.pipe(
    ofType(types.FORGOT),
    tap(() => {
      this.router.navigate(['/email-sent']);
    })
  );

  // @Effect({ dispatch: false })
  // loginSucess = this.actions$.pipe(
  //   ofType(types.LOGIN),
  //   tap(() => {
  //     const state = JSON.parse(localStorage.getItem('_state'));
  //     if (state.token !== null) {
  //       this.router.navigate(['/dashboard']);
  //     }
  //   })
  // );
}

import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as types from '../_actions/types';
import * as AuthActions from '../_actions/auth.actions';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Injectable({ providedIn: 'root' })
export class AuthEffets {

  constructor(private actions$: Actions,
              private apiService: ApiService) {}

  @Effect()
   authLogin = this.actions$.pipe(
    ofType(types.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      const data = {
        email: authData.payload.email,
        password: authData.payload.password
      };

      return this.apiService.login(data).pipe(
        map((res: any) => {
          return new AuthActions.Login({ user: res.data.user, token: res.data.token });
        }),
        catchError(error => {
          return of();
        })
      );
    }),
  );
}

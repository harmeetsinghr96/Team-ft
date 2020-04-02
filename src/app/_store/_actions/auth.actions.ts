import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

import * as types from './types';

export class Register implements Action {
  readonly type = types.REGISTER;
  constructor(public payload: { user: User }) {}
}

export class Login implements Action {
  readonly type = types.LOGIN;
  constructor(public payload: { user: User, token: string }) {}
}

export type AuthActions = Register | Login;


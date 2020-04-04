import { Action } from '@ngrx/store';

import * as types from './types';
import { User } from 'src/app/models/user.model';

export class Register implements Action {
  readonly type = types.REGISTER;
}

export class RegisterStart implements Action {
  readonly type = types.REGISTER_START;
  constructor(public payload: { user: User }) {}
}

export class RegisterFailed implements Action {
  readonly type = types.REGISTER_FAILED;
  constructor(public payload: string) {}
}

export class Login implements Action {
  readonly type = types.LOGIN;
  constructor(public payload: { user: User, token: string }) {}
}

export class Logout implements Action {
  readonly type = types.LOGOUT;
}

export class LoginStart implements Action {
  readonly type = types.LOGIN_START;
  constructor(public payload: { user: User }) {}
}

export class LoginFailed implements Action {
  readonly type = types.LOGIN_FAILED;
  constructor(public payload: string) {}
}

export type AuthActions = Register | RegisterStart | RegisterFailed | Login | LoginStart | LoginFailed | Logout;


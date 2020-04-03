import { Action } from '@ngrx/store';

import * as types from './types';

export class Register implements Action {
  readonly type = types.REGISTER;
  constructor(public payload: { id: string, token: string }) {}
}

export class RegisterStart implements Action {
  readonly type = types.REGISTER_START;
  constructor(public payload: { full_name: string, email: string, company_full_name: string, password: string }) {}
}

export class RegisterFailed implements Action {
  readonly type = types.REGISTER_FAILED;
  constructor(public payload: string) {}
}

export class Login implements Action {
  readonly type = types.LOGIN;
  constructor(public payload: { user: object, token: string }) {}
}

export class Logout implements Action {
  readonly type = types.LOGOUT;
}

export class LoginStart implements Action {
  readonly type = types.LOGIN_START;
  constructor(public payload: { email: string, password: string }) {}
}

export class LoginFailed implements Action {
  readonly type = types.LOGIN_FAILED;
  constructor(public payload: string) {}
}

export type AuthActions = Register | RegisterStart | RegisterFailed | Login | LoginStart | LoginFailed | Logout;


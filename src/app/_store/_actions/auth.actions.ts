import { Action } from '@ngrx/store';

import * as types from './_types/auth.type';
import { User } from 'src/app/models/user.model';

// REGISTER ACTIONS
export class RegisterStart implements Action {
  readonly type = types.REGISTER_START;
  constructor(public payload: { user: User }) {}
}

export class Register implements Action {
  readonly type = types.REGISTER;
}

export class RegisterFailed implements Action {
  readonly type = types.REGISTER_FAILED;
  constructor(public payload: string) {}
}

// LOGIN ACTIONS
export class LoginStart implements Action {
  readonly type = types.LOGIN_START;
  constructor(public payload: { user: User }) {}
}

export class Login implements Action {
  readonly type = types.LOGIN;
  constructor(public payload: { user: User, token: string }) {}
}

export class LoginFailed implements Action {
  readonly type = types.LOGIN_FAILED;
  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = types.LOGOUT;
}

// FORGOT ACTIONS STRT
export class ForgotStart implements Action {
  readonly type = types.FORGOT_START;
  constructor(public payload: { user: User }) {}
}

export class Forgot implements Action {
  readonly type = types.FORGOT;
}

export class ForgotFailed implements Action {
  readonly type = types.FORGOT_FAILED;
  constructor(public payload: string) {}
}

// FORGOT ACTIONS STRT
export class VerificationStart implements Action {
  readonly type = types.EMAIL_VERIFICATION_START;
  constructor(public payload: { user: User }) {}
}

export class Verification implements Action {
  readonly type = types.EMAIL_VERIFICATION;
  constructor(public payload: { user: User, token: string }) {}
}

export class VerificationFailed implements Action {
  readonly type = types.EMAIL_VERIFICATION_FAILED;
  constructor(public payload: string) {}
}

export class RecoveryStart implements Action {
  readonly type = types.RECOVERY_START;
  constructor(public payload: { user: User }) {}
}

export class Recovery implements Action {
  readonly type = types.RECOVERY;
}

export class RecoveryFailed implements Action {
  readonly type = types.RECOVERY_FAILED;
  constructor(public payload: string) {}
}


export type AuthActions =
  Register |
  RegisterStart |
  RegisterFailed |
  Login |
  LoginStart |
  LoginFailed |
  Logout |
  ForgotStart |
  Forgot |
  ForgotFailed |
  VerificationStart |
  Verification |
  VerificationFailed |
  RecoveryStart |
  Recovery |
  RecoveryFailed;


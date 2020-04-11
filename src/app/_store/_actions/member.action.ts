import { Action } from '@ngrx/store';

import * as types from './_types/members.type';
import { User } from 'src/app/models/user.model';

// REGISTER ACTIONS
export class MemberListStart implements Action {
  readonly type = types.MEMBER_LIST_START;
}

export class MemberList implements Action {
  readonly type = types.MEMBER_LIST;
  constructor(public payload: { members: User[] }) {}
}

export class MemberListFailed implements Action {
  readonly type = types.MEMBER_LIST_FAILED;
  constructor(public payload: string) {}
}

export class MemberShowStart implements Action {
  readonly type = types.MEMBER_SHOW_START;
  constructor(public payload: { id: string }) {}
}

export class MemberShow implements Action {
  readonly type = types.MEMBER_SHOW;
  constructor(public payload: { member: User }) {}
}

export class MemberShowFailed implements Action {
  readonly type = types.MEMBER_SHOW_FAILED;
  constructor(public payload: string) {}
}

export class ResetMemberShow implements Action {
  readonly type = types.RESET_MEMBER_SHOW;
}

export type MemberActions =
  MemberListStart |
  MemberList |
  MemberListFailed |
  MemberShowStart |
  MemberShow |
  MemberShowFailed |
  ResetMemberShow;


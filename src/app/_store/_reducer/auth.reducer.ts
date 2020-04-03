import { User } from 'src/app/models/user.model';

import * as types from '../_actions/types';
import * as authActions from '../_actions/auth.actions';

export interface State {
  user: User;
  token: string;
  error: string;
}

const initState: State = {
  user: null,
  token: null,
  error: null
};

export const AuthReducer = (state = initState, action: authActions.AuthActions) => {
  switch (action.type) {
    case types.LOGIN:
     const $user = new User(
        action.payload.user.id,
        action.payload.user.fullName,
        action.payload.user.email,
        action.payload.user.company,
        action.payload.user.password,
        action.payload.user.admin,
        action.payload.user.superAdmin,
        action.payload.user.status,
        action.payload.user.verified,
        action.payload.user.refId,
        action.payload.user.role,
        action.payload.user.createdAt,
        null
      );
     return { ...state, user: $user, token: action.payload.token, error: null};

    case types.LOGIN_START:
      return { ...state, user: null, token: null, error: null};

    case types.LOGIN_FAILED:
      return { ...state, user: null, token: null, error: action.payload.error};

    default:
      return state;
  }
};


import { User } from 'src/app/models/user.model';

import * as types from '../_actions/types';
import * as authActions from '../_actions/auth.actions';

export interface State {
  user: User;
  token: string;
}

const initState: State = {
  user: null,
  token: null
};

export const AuthReducer = (state = initState, action: authActions.AuthActions) => {
  switch (action.type) {
    case types.REGISTER:

      const $user = new User(
        null,
        action.payload.user.fullName,
        action.payload.user.email,
        action.payload.user.company,
        action.payload.user.password,
        null
      );

      return { ...state, user: $user };

    default:
      return state;
  }
};


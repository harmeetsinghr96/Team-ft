import * as types from '../_actions/types';
import * as authActions from '../_actions/auth.actions';

export interface State {
  loading: boolean;
  user_id: string;
  user: object;
  token: string;
  error: string;
}

const initState: State = {
  loading: false,
  user_id: null,
  user: null,
  token: null,
  error: null
};

export const AuthReducer = (state = initState, action: authActions.AuthActions) => {
  switch (action.type) {
    case types.LOGIN:
     return { ...state, loading: false, user_id: null, user: action.payload.user , token: action.payload.token, error: null};

    case types.LOGOUT:
      return { ...state, loading: false, user_id: null, user: null, token: null, error: null };

    case types.LOGIN_START:
      return { ...state, loading: true, user_id: null, user: null, token: null, error: null };

    case types.LOGIN_FAILED:
      return { ...state, loading: false, user_id: null, user: null, token: null, error: action.payload };

    case types.REGISTER_START:
      return { ...state, loading: true, user_id: null, user: null, token: null, error: null };

    case types.REGISTER:
      return { ...state, loading: true, user_id: action.payload.id, user: null, token: action.payload.token, error: null};

    case types.REGISTER_FAILED:
      return { ...state, loading: true, user_id: null, user: null, token: null, error: action.payload };

    default:
      return state;
  }
};


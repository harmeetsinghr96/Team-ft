import * as types from '../_actions/_types/auth.type';
import * as authActions from '../_actions/auth.actions';
import { User } from 'src/app/models/user.model';

export interface State {
  loading: boolean;
  user: User;
  token: string;
  error: string;
}

const initState: State = {
  loading: false,
  user: null,
  token: null,
  error: null
};

export const AuthReducer = (state = initState, action: authActions.AuthActions) => {
  switch (action.type) {
    case types.LOGOUT:
      return { ...state, loading: false };

    case types.LOGIN_START:
      return { ...state, loading: true };

    case types.LOGIN:
      const loginState = { ...state, loading: false, user: action.payload.user, token: action.payload.token };
      if (loginState.user && loginState.token) {
        StoreState(loginState);
      }
      return loginState;

    case types.LOGIN_FAILED:
      return { ...state, loading: false, error: action.payload };

    case types.REGISTER_START:
      return { ...state, loading: true };

    case types.REGISTER:
      return { ...state, loading: false };

    case types.REGISTER_FAILED:
      return { ...state, loading: false, error: action.payload };

    case types.FORGOT_START:
      return { ...state, loading: true };

    case types.FORGOT:
      return { ...state, loading: false };

    case types.FORGOT_FAILED:
      return { ...state, loading: false, error: action.payload };

    case types.EMAIL_VERIFICATION_START:
      return { ...state, loading: true };

      case types.EMAIL_VERIFICATION:
        const verificationState = { ...state, loading: false, user: action.payload.user, token: action.payload.token };
        StoreState(verificationState);
        return verificationState;

      case types.EMAIL_VERIFICATION_FAILED:
        return { ...state, loading: false, error: action.payload };

      case types.RECOVERY_START:
        return { ...state, loading: true };

      case types.RECOVERY:
        return { ...state, loading: false };

      case types.RECOVERY_FAILED:
        return { ...state, loading: false, error: action.payload };

      default:
        const oldState = JSON.parse(localStorage.getItem('_state'));
        return oldState ? oldState : state;
  }
};

function StoreState(state) {
  localStorage.setItem('_state', JSON.stringify(state));
}


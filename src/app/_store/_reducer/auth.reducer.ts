import * as types from '../_actions/_types/auth.type';
import * as authActions from '../_actions/auth.actions';
import { User } from 'src/app/models/user.model';

export interface State {
  loading: boolean;
  isSignedIn: boolean;
  user: User;
  token: string;
  error: string;
}

const initState: State = {
  loading: false,
  isSignedIn: false,
  user: null,
  token: null,
  error: null
};

export const AuthReducer = (state = initState, action: authActions.AuthActions) => {
  switch (action.type) {
    case types.LOGOUT:
      return { ...state, loading: false, isSignedIn: false, user: null, token: null, error: null };

    case types.LOGIN_START:
      return { ...state, loading: true, isSignedIn: false, user: null, token: null, error: null };

    case types.LOGIN:
      let loginState;

      if (action.payload.user && action.payload.token) {
        loginState = { ...state, loading: false,
          isSignedIn: true,
          user: action.payload.user,
          token: action.payload.token, error: null };
        StoreState(loginState);
      } else {
        loginState = { ...state, loading: false,
          isSignedIn: false,
          user: action.payload.user,
          token: null, error: null };
      }

      return loginState;

    case types.LOGIN_FAILED:
      return { ...state, loading: false, isSignedIn: false, user: null, token: null, error: action.payload };

    case types.REGISTER_START:
      return { ...state, loading: true, isSignedIn: false, user: null, token: null, error: null };

    case types.REGISTER:
      return { ...state, loading: false, isSignedIn: false, user: null, token: null, error: null };

    case types.REGISTER_FAILED:
      return { ...state, loading: false, isSignedIn: false, user: null, token: null, error: action.payload };

    case types.FORGOT_START:
      return { ...state, loading: true, isSignedIn: false, user: null, token: null, error: null };

    case types.FORGOT:
      return { ...state, loading: false, isSignedIn: false, user: null, token: null, error: null };

    case types.FORGOT_FAILED:
      return { ...state, loading: false, isSignedIn: false, user: null, token: null, error: action.payload };

    case types.EMAIL_VERIFICATION_START:
      return { ...state, loading: true, isSignedIn: false, user: null, token: null, error: null };

      case types.EMAIL_VERIFICATION:
        const verificationState = { ...state, loading: false, isSignedIn: true,
          user: action.payload.user, token: action.payload.token, error: null };
        StoreState(verificationState);
        return verificationState;

      case types.EMAIL_VERIFICATION_FAILED:
        return { ...state, loading: false, isSignedIn: false, user: null, token: null, error: action.payload };

      case types.RECOVERY_START:
        return { ...state, loading: true, isSignedIn: false, user: null, token: null, error: null };

      case types.RECOVERY:
        return { ...state, loading: false, isSignedIn: false, user: null, token: null, error: null };

      case types.RECOVERY_FAILED:
        return { ...state, loading: false, isSignedIn: false, user: null, token: null, error: action.payload };

      default:
        const oldState = JSON.parse(localStorage.getItem('_state'));
        return oldState ? oldState : state;
  }
};

function StoreState(state) {
  localStorage.setItem('_state', JSON.stringify(state));
}


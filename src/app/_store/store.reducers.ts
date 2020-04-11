import { ActionReducerMap } from '@ngrx/store';

import * as authReducer from './_reducer/auth.reducer';
import * as memberReducer from './_reducer/member.reducer';

export interface AppState {
  auth: authReducer.State;
  members: memberReducer.State;
}

const CombinedReducer: ActionReducerMap<AppState> = {
  auth: authReducer.AuthReducer,
  members: memberReducer.MemberReducer
};

export default CombinedReducer;

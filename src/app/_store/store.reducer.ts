import { ActionReducerMap } from '@ngrx/store';

import * as authReducer from './_reducer/auth.reducer';

export interface AppState {
  auth: authReducer.State;
}

const CombinedReducer: ActionReducerMap<AppState> = {
  auth: authReducer.AuthReducer
};

export default CombinedReducer;

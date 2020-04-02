import * as authReducer from './_reducer/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  auth: authReducer.State;
}

const combinedReducer: ActionReducerMap<AppState> = {
  auth: authReducer.AuthReducer
};

export default combinedReducer;

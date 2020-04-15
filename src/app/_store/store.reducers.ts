import { ActionReducerMap } from '@ngrx/store';

import * as authReducer from './_reducer/auth.reducer';
import * as memberReducer from './_reducer/member.reducer';
import * as TodoTaskReducer from './_reducer/todo-task.reducer';

export interface AppState {
  auth: authReducer.State;
  members: memberReducer.State;
  todoTask: TodoTaskReducer.State;
}

const CombinedReducer: ActionReducerMap<AppState> = {
  auth: authReducer.AuthReducer,
  members: memberReducer.MemberReducer,
  todoTask: TodoTaskReducer.TodoTaskReducer
};

export default CombinedReducer;

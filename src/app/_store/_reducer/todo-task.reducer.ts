import * as types from '../_actions/_types/todo-task.types';
import * as todoTaskAction from '../_actions/todo-task.actions';
import { Todo } from 'src/app/models/todo.model';

export interface State {
  loading: boolean;
  todos: Todo[];
  error: string;
}

const initState: State = {
  loading: false,
  todos: null,
  error: null
};

export const TodoTaskReducer = (state = initState, action: todoTaskAction.TodoTaskActions) => {
  switch (action.type) {
    case types.TODO_LIST_START:
      return { ...state, loading: true, error: null };

    case types.TODO_LIST:
      return { ...state, loading: false, todos: action.payload.todos, error: null };

    case types.TODO_LIST_FAILED:
      return { ...state, loading: false, todos: null, error: action.payload };

    default:
        return state;
  }
};


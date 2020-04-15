import { Action } from '@ngrx/store';

import * as types from './_types/todo-task.types';
import { Todo } from '../../models/todo.model';

// REGISTER ACTIONS
export class TodoListStart implements Action {
  readonly type = types.TODO_LIST_START;
}

export class TodoList implements Action {
  readonly type = types.TODO_LIST;
  constructor(public payload: { todos: Todo[] }) {}
}

export class TodoListFailed implements Action {
  readonly type = types.TODO_LIST_FAILED;
  constructor(public payload: string) {}
}

export type TodoTaskActions =
  TodoListStart |
  TodoList |
  TodoListFailed;


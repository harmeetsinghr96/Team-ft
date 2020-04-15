import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

import * as types from '../_actions/_types/todo-task.types';
import * as TodoTaskActions from '../_actions/todo-task.actions';
import { TodoTaskService } from 'src/app/services/API/todo-task.service';

@Injectable()
export class TodoTaskEffects {

  constructor(private actions$: Actions,
              private todoTaskService: TodoTaskService) { }

  @Effect()
  Todos = this.actions$.pipe(
    ofType(types.TODO_LIST_START),
    switchMap(() => {
      return this.todoTaskService.todos();
    }),
    map((res: any) => {
      console.log(res);
      return new TodoTaskActions.TodoList({ todos: res.data.todos });
    }),
    catchError(errorRes => {
      let errorMessage = 'An unknown error occurred!';
      if (!errorRes.error || !errorRes.error.message) {
        return of(new TodoTaskActions.TodoListFailed(errorMessage));
      }

      if (errorRes.error.message) {
        errorMessage = errorRes.error.message;
        return of(new TodoTaskActions.TodoListFailed(errorMessage));
      }
      return of(new TodoTaskActions.TodoListFailed (errorMessage));
    })
  );

}

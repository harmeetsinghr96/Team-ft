import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { AppState } from 'src/app/_store/store.reducers';
import { Todo } from 'src/app/models/todo.model';
import { Store } from '@ngrx/store';
import * as TodoTaskActions from '../../../../_store/_actions/todo-task.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public panelOpenState = false;
  public todos: Todo[] = [];

  constructor(private store$: Store<AppState>) { }

  ngOnInit() {
    this.store$.select('todoTask').subscribe(state => {
      this.todos = state.todos;
      console.log(this.todos);
    });

    this.loadTodo();
  }

  private loadTodo() {
    this.store$.dispatch(new TodoTaskActions.TodoListStart());
  }

  drop(event: CdkDragDrop<{title: string, poster: string}[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

  close(event: Event, name: string) {
    console.log(event);
  }

}

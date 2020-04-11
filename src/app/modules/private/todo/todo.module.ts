import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TasksComponent } from './tasks/tasks.component';


@NgModule({
  declarations: [
    ListComponent,
    TasksComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    SharedModule
  ]
})
export class TodoModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'members', loadChildren: () => import('./members/members.module').then(module => module.MembersModule )},
  { path: 'todo', loadChildren: () => import('./todo/todo.module').then(module => module.TodoModule )}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }

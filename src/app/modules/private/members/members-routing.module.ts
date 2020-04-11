import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { MemberResolver } from 'src/app/services/resolvers/member-resolver.service';


const routes: Routes = [
  { path: '', component: ListComponent, resolve: [MemberResolver] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { PublicComponent } from './layout/public/public.component';
import { PrivateComponent } from './layout/private/private.component';


const routes: Routes = [
  // public routes start
  { path: '', component: PublicComponent, children: [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '', loadChildren: () => import('./modules/public/public.module').then(module => module.PublicModule) }
  ]},

  // private routes start
  { path: 'dashboard', component: PrivateComponent, children: [
    { path: '', redirectTo: 'todo', pathMatch: 'full' },
    { path: '', loadChildren: () => import('./modules/private/private.module').then(module => module.PrivateModule ) }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicComponent } from './public/public.component';
import { PrivateComponent } from './private/private.component';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PublicComponent,
    PrivateComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})

export class LayoutModule { }

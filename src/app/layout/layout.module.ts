import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicComponent } from './public/public.component';
import { PrivateComponent } from './private/private.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PublicComponent,
    PrivateComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})

export class LayoutModule { }

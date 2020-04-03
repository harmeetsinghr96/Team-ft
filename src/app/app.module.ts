import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import CombinedReducer from './_store/store.reducer';

import { EffectsModule } from '@ngrx/effects';
import { AuthEffets } from './_store/_effects/auth.effext';

import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(CombinedReducer),
    EffectsModule.forRoot([AuthEffets]),
    LayoutModule,
    SharedModule,
  ],
  providers: [
    AuthEffets
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

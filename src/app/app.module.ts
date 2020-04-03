import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import CombinedReducer from './_store/store.reducer';

import { EffectsModule } from '@ngrx/effects';
import { AuthEffets } from './_store/_effects/auth.effext';

import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { ApiService } from './services/api.service';
import { LoaderService } from './_constant/loader.service';
import { RequestInterceptorService } from './_constant/interceptor.service';

import { LoaderComponent } from './components/loader/loader.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(CombinedReducer),
    EffectsModule.forRoot([AuthEffets]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    LayoutModule,
    SharedModule
  ],
  providers: [
    ApiService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

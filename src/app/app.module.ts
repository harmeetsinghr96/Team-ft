import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import CombinedReducer from './_store/store.reducers';

import { EffectsModule } from '@ngrx/effects';

import { RequestInterceptorService } from './_constant/interceptors/interceptor.service';

import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { PublicModule } from './modules/public/public.module';
import { PrivateModule } from './modules/private/private.module';

import { ApiService } from './services/API/auth.service';
import { LoaderService } from './services/shared/loader.service';
import { AlertService } from './services/shared/alert.service';

import { LoaderComponent } from './components/loader/loader.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AlertComponent } from './components/alert/alert.component';
import CombinedEffets from './_store/store.effets';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(CombinedReducer),
    EffectsModule.forRoot(CombinedEffets),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    LayoutModule,
    SharedModule,
    PublicModule,
    PrivateModule,
  ],
  providers: [
    ApiService,
    AlertService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

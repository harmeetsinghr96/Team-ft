import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { InvitationComponent } from './invitation/invitation.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { EffectsModule } from '@ngrx/effects';

import { AuthEffets } from 'src/app/_store/_effects/auth.effext';
import { SuccessRegisterComponent } from './success-register/success-register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    InvitationComponent,
    EmailVerificationComponent,
    PasswordRecoveryComponent,
    SuccessRegisterComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    EffectsModule.forFeature([AuthEffets])
  ]
})
export class PublicModule { }

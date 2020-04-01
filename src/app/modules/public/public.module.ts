import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { InvitationComponent } from './invitation/invitation.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    InvitationComponent,
    EmailVerificationComponent,
    PasswordRecoveryComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }

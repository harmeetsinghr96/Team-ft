import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SuccessRegisterComponent } from './success-register/success-register.component';
import { EmailSentComponent } from './email-sent/email-sent.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registered', component: SuccessRegisterComponent },
  { path: 'verification', component: EmailVerificationComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'email-sent', component: EmailSentComponent },
  { path: 'recovery-password', component: PasswordRecoveryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }

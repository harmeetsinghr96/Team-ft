import { Component, OnInit, ViewChild, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as state from '../../../_store/store.reducer';
import * as AuthActions from '../../../_store/_actions/auth.actions';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { PlaceholderDirective } from 'src/app/directives/placeholder.directive';
import { Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/components/alert/alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formData: FormGroup;
  public error: string;
  public user: any;
  public comapny: Array<any>;
  protected token: string;

  private closeSub: Subscription;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  @ViewChild('myForm', { static: true }) form: ElementRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private store: Store<state.AppState>,
              private router: Router) { }

  ngOnInit() {
    this.store.select('auth').subscribe(authState => {
      this.error = authState.error;
      this.user = authState.user;
      this.token = authState.token;
      if (this.error) {
        this.showErrorAlert(this.error);
      }

      if (this.user) {
        this.comapny = this.user.company;

        if (this.comapny.length > 0) {
          const inputs: Array<any> = this.form.nativeElement.elements;
          const email: HTMLInputElement = inputs[0];
          const password: HTMLInputElement = inputs[1];

          email.setAttribute('disabled', 'true');
          password.setAttribute('disabled', 'true');
        }
      }

      if (this.user && this.token) {
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('token', this.token);
        this.router.navigateByUrl('/dashboard');
      }
    });
    this.initForm();
  }

  login($ev, values: any) {
    $ev.preventDefault();

    // tslint:disable-next-line: forin
    for (const control in this.formData.controls) {
      this.formData.controls[control].markAsTouched();
    }

    if (this.formData.valid) {
      const email: string = this.formData.value.email;
      const password: string = this.formData.value.password;
      // tslint:disable-next-line: variable-name
      let company_id: string;

      if (typeof values === 'string') {
        company_id = values;
      }

      let user: User;

      if (typeof values === 'object') {
        user = { email, password };
      } else {
        user = { email, password, company_id };
      }

      this.store.dispatch(new AuthActions.LoginStart({ user }));

    }
  }

  private initForm() {
    const passwordExp = '(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$';
    const emailExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    this.formData = new FormGroup({
      email: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(emailExp)])),
      password: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(passwordExp)])),
    });
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.closeBtn.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

}

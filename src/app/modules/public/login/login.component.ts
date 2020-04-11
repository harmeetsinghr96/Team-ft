import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as state from '../../../_store/store.reducers';
import * as AuthActions from '../../../_store/_actions/auth.actions';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { PlaceholderDirective } from 'src/app/directives/placeholder.directive';
import { AlertService } from '../../../services/shared/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public checked = false;
  public disabled = false;
  public formData: FormGroup;
  public error: string;
  public user: any;
  public comapny: Array<any>;
  protected token: string;

  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  @ViewChild('myForm', { static: true }) form: ElementRef;

  constructor(private store: Store<state.AppState>,
              private router: Router,
              private alertService: AlertService) { }

  ngOnInit() {
    this.store.select('auth').subscribe(authState => {
      this.error = authState.error;
      this.user = authState.user;
      this.token = authState.token;
      if (this.error) {
        this.alertService.showErrorAlert(this.alertHost, this.error);
      }


      if (this.user && this.token) {
        this.router.navigateByUrl('/dashboard');
      }


      if (this.user) {
        if (Array.isArray(this.user.company)) {
          this.comapny = this.user.company;

          if (Array.isArray(this.comapny)) {
            const inputs: Array<any> = this.form.nativeElement.elements;
            const email: HTMLInputElement = inputs[0];
            const password: HTMLInputElement = inputs[1];

            email.setAttribute('disabled', 'true');
            password.setAttribute('disabled', 'true');
          }
        }
      }
    });

    this.initForm();
  }

  login($ev, values: any) {
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

}

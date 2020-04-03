import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as state from '../../../_store/store.reducer';
import * as AuthActions from '../../../_store/_actions/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formData: FormGroup;
  public error: string;


  constructor(private store: Store<state.AppState>, private router: Router) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      this.error = authState.error;
      if (this.error) {}
    });
    this.initForm();
  }

  login($ev, values) {
    $ev.preventDefault();
    // tslint:disable-next-line: forin
    for (const control in this.formData.controls) {
      this.formData.controls[control].markAsTouched();
    }

    if (this.formData.valid) {
      const email: string = this.formData.value.email;
      const password: string = this.formData.value.password;

      this.store.dispatch(new AuthActions.LoginStart({ email, password }));
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

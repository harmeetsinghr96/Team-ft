import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/_store/store.reducers';
import * as AuthActions from '../../../_store/_actions/auth.actions';
import { PlaceholderDirective } from '../../../directives/placeholder.directive';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/shared/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public formData: FormGroup;
  public error: string;
  @ViewChild(PlaceholderDirective, { static: false}) alertHost: PlaceholderDirective;

  constructor(private store$: Store<AppState>, private alertService: AlertService) { }

  ngOnInit(): void {
    this.store$.select('auth').subscribe(authState => {
      this.error = authState.error;
      if (this.error === 'Link expired..!!') {
        this.error = null;
      } else if (this.error) {
        console.log(this.error);
        this.alertService.showErrorAlert(this.alertHost, this.error);
      }
    });
    this.initForm();
  }

  register($ev, values) {
    $ev.preventDefault();
   // tslint:disable-next-line: forin
    for (const control in this.formData.controls) {
      this.formData.controls[control].markAsTouched();
    }

    if (this.formData.valid) {
      const full_name = this.formData.value.full_name;
      const email = this.formData.value.email;
      const company_full_name = this.formData.value.company_full_name;
      const password = this.formData.value.password;

      const user: User = { full_name, email, company_full_name, password };
      this.store$.dispatch(new AuthActions.RegisterStart({user}));
    }
  }

  private initForm() {
    const passwordExp = '(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$';
    const emailExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    this.formData = new FormGroup({
      full_name: new FormControl(null, Validators.compose([Validators.required])),
      email: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(emailExp)])),
      company_full_name: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(passwordExp)])),
    });
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/shared/alert.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import * as state from '../../../_store/store.reducer';
import { PlaceholderDirective } from 'src/app/directives/placeholder.directive';
import * as AuthActions from '../../../_store/_actions/auth.actions';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

  public formData: FormGroup;
  public error: string;
  protected token: string;
  protected id: string;

  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

  constructor(private store: Store<state.AppState>,
              private router: Router,
              private route: ActivatedRoute,
              private alertService: AlertService) { }

  ngOnInit() {
    this.getQueryParams();

    this.store.select('auth').subscribe(authState => {
      this.error = authState.error;
      this.token = authState.token;
      if (this.error) {
        this.alertService.showErrorAlert(this.alertHost, this.error);
      }

    });

    this.initForm();
  }

  passwordReset($ev, values: any) {
    $ev.preventDefault();

    // tslint:disable-next-line: forin
    for (const control in this.formData.controls) {
      this.formData.controls[control].markAsTouched();
    }

    if (this.formData.valid) {
      const password = this.formData.value.password;
      const confirm = this.formData.value.confirmPassword;

      if (password === confirm) {
        const user: User = { token: this.token, id: this.id, password };
        this.store.dispatch(new AuthActions.RecoveryStart({ user }));
      } else {
        const error = 'Password didn\'t Matched.';
        this.alertService.showErrorAlert(this.alertHost, error);
      }

    }

  }

  private getQueryParams() {
    this.route.queryParamMap.subscribe(
        (queryParams: ParamMap) => {
          this.token = queryParams.get('token');
          this.id = queryParams.get('id');
      });
  }

  private initForm() {
    const passwordExp = '(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$';

    this.formData = new FormGroup({
      password: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(passwordExp)])),
      confirmPassword: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(passwordExp)])),
    });
  }

}

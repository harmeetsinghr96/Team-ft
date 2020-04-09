import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as state from 'src/app/_store/store.reducer';
import { AlertService } from 'src/app/services/shared/alert.service';
import { PlaceholderDirective } from 'src/app/directives/placeholder.directive';
import * as AuthActions from '../../../_store/_actions/auth.actions';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public formData: FormGroup;
  public error: string;

  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

  constructor(private store$: Store<state.AppState>, private alertService: AlertService) { }

  ngOnInit() {
    this.store$.select('auth').subscribe(appState => {
      this.error = appState.error;

      if (this.error) {
        this.alertService.showErrorAlert(this.alertHost, this.error);
      }
    });

    this.initForm();
  }

  forgot($ev, values) {
    $ev.preventDefault();

    // tslint:disable-next-line: forin
    for (const control in this.formData.controls) {
      this.formData.controls[control].markAsTouched();
    }

    if (this.formData.valid) {
      const user: User = {
        email: this.formData.value.email
      };

      this.store$.dispatch(new AuthActions.ForgotStart({user}));
    }
  }

  private initForm() {
    const emailExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    this.formData = new FormGroup({
      email: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(emailExp)])),
    });
  }
}

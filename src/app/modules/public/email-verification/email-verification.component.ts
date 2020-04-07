import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as AuthActions from '../../../_store/_actions/auth.actions';
import * as state from '../../../_store/store.reducer';

import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/shared/alert.service';
import { PlaceholderDirective } from 'src/app/directives/placeholder.directive';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit, AfterViewInit {

  public formData: FormGroup;

  public token: string;
  public id: string;
  public error: string;
  public user: User;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store$: Store<state.AppState>,
              private alertService: AlertService) { }

  ngOnInit() {
    this.getQueryParams();
    this.initForm();
    this.store$.select('auth').subscribe(authState => {
      this.error = authState.error;
      this.user = authState.user;
      this.token = authState.token;

      if (this.error) {
        this.alertService.showErrorAlert(this.alertHost, this.error);
        setTimeout(() => {
          this.alertService.showErrorAlert(this.alertHost, 'Redirecting back to Register');
          setTimeout(() => {
            this.router.navigate(['/register']);
          }, 2000);
        }, 2000);
      }

      if (this.user && this.token) {
        setTimeout(() => {
          this.router.navigateByUrl('/dashboard');
        }, 2000);
      }
    });
  }

  ngAfterViewInit() {
    this.verified();
  }

  verified() {
    if (this.formData.valid) {
      const user: User = {
        token: this.formData.value.token,
        id: this.formData.value.id
      };

      this.store$.dispatch(new AuthActions.VerificationStart({ user }));
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
    this.formData = new FormGroup({
      token: new FormControl(this.token, Validators.required),
      id: new FormControl(this.id, Validators.required)
    });
  }

}

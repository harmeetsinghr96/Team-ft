import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/_store/store.reducer';
import * as AuthActions from '../../../_store/_actions/auth.actions';
import { PlaceholderDirective } from '../../../directives/placeholder.directive';
import { AlertComponent } from '../../../components/alert/alert.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public formData: FormGroup;
  public error: string;
  private closeSub: Subscription;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private store$: Store<AppState>) { }

  ngOnInit(): void {
    this.store$.select('auth').subscribe(authState => {
      this.error = authState.error;
      if (this.error) {
        this.showErrorAlert(this.error);
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

      this.store$.dispatch(new AuthActions.RegisterStart({ full_name, email, company_full_name, password }));
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

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );

    console.log(this.alertHost);
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

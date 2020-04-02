import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formData: FormGroup;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.initForm();
  }

  register($ev, values) {
    console.log(values);
    $ev.preventDefault();
    // tslint:disable-next-line: forin
    for (const control in this.formData.controls) {
      this.formData.controls[control].markAsTouched();
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

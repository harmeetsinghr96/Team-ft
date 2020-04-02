import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formData: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  login($ev, values) {
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
      email: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(emailExp)])),
      password: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(passwordExp)])),
    });
  }

}

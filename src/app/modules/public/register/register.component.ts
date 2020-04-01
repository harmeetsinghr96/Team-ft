import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  initForm() {
    this.form = new FormGroup({
      full_name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      company_full_name: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }
}

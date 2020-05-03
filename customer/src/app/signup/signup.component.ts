import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthService]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.initSignupForm();
  }

  ngOnInit() {
  }

  initSignupForm() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { notSame: true };
  }

  signUp() {
    console.log(this.signupForm);
    this.authService.createCustomer(this.signupForm).subscribe((res) => {
      console.log(res);
    }, (err) => {

    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group ({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  showPassword() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSubmit() {
    if(this.loginForm.valid) {
      //send the obj to api
      console.log(this.loginForm.value);

      this.authService.login(this.loginForm.value)
      .subscribe({
        next:(res) => {
          console.log(res);
          this.authService.storeToken(res.token);
          //alert(res.message);
          //this.toast.success({detail: "SUCCESS", summary:res.message, duration: 5000});
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        },
        error:(err) => {
          console.log(err?.error.message);
          //this.toast.error({detail: "ERROR", summary:"Something went wrong", duration: 5000});
        }

      });
    } else {
      //throw the error using toaster and with required fields
      console.log("form is not valid");
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your form is invalid");
    }
  }



}

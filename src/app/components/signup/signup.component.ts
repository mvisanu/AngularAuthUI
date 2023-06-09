import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService
    ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  showPassword() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSubmit() {
    if(this.signUpForm.valid) {
      //send the obj to api
      console.log(this.signUpForm.value);
      this.authService.signUp(this.signUpForm.value)
      .subscribe({
        next:(res) => {
          //alert(res.message);
          this.toast.success({detail: "SUCCESS", summary:res.message, duration: 5000});
          this.signUpForm.reset();
          this.router.navigate(['login']);
        },
        error:(err) => {
          console.log(err?.error.message);
          this.toast.error({detail: "ERROR", summary:"Something went wrong", duration: 5000});
        }
      });
    } else {
      //throw the error using toaster and with required fields
      console.log("form is not valid");
      ValidateForm.validateAllFormFields(this.signUpForm);
      alert("Your form is invalid");
    }
  }



}

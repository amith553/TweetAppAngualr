import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  isValid = false;
  errorMessage=false;
  check = {
    emailId: "string",
    mobileNumber: 0
  }
  isPasswordResetSuccessfull = false;
  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.check.emailId = form.value.email;
    this.check.mobileNumber=form.value.mobileNumber;
    console.log(this.check)
    this.authService.SecurityCheckValidation(this.check).subscribe((res) => {
      this.isValid = res;
      if(!res){
        this.errorMessage=true
      }
    });
  }

  onReset(form: NgForm) {
    this.authService.resetPassword(this.check.emailId, form.value.password).subscribe((res) => {
      if (res) {
        this.isPasswordResetSuccessfull = true;
        setTimeout(() => {
          this.router.navigate(['tweetapp']);
        }, 2000);
      }
    });
  }
}

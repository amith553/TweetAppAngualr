import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  errorMessage = '';
  successfullMessage = '';
  constructor(private authService: AuthService, private router: Router) { }
  options = [
    {key: 1, value:"Favorite Movie"},
    {key: 2, value:"Favorite Color"},
    {key: 3, value:"Favorite Cuisine"},
    {key: 4, value:"Favorite Sport"}
  ]
  ngOnInit(): void {
  }
 
  onSignUp(form: NgForm){
    const userDetail = new User(
      form.value.email, 
      form.value.dateOfBirth, 
      form.value.gender, 
      form.value.password, 
      form.value.confirmPassword, 
      form.value.firstName,
      form.value.lastName,
      form.value.mobileNumber);
      if(userDetail.password==userDetail.confirmPassword){
      this.authService.signUp(userDetail).subscribe((responseData) => {
        this.successfullMessage = 'Registration Successfull! You will be redirected to login page in 2sec...';
        form.reset();
        setTimeout(() => {
          this.router.navigate(['']);
        }, 2000);
      },error => {
        this.errorMessage = error.error.error;
      });
    }
    else{
      this.errorMessage="Passwords does not match";
    }
  }

}

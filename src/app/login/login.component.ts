import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  displayStyle: string= 'none';
  loginForm: boolean = false;
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
  closePopup(){
    this.successfullMessage = '';
    this.errorMessage = '';
    this.displayStyle = 'none';
  }

  onLoginClick(){
    this.displayStyle = 'block';
    this.loginForm = true;
  }

  onSignUpClick(){
    this.displayStyle = 'block';
    this.loginForm = false;
  }

  onLogin(form : NgForm){
    this.authService.login(form.value.email, form.value.password).subscribe((response) =>{
      this.closePopup();
      localStorage.setItem('user', response.emailId);
      this.router.navigate(['tweetapp/','home']);
    }, error => {
      this.errorMessage = error;
    });
    form.reset();
  }



}

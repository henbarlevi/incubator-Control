import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'] //design from : http://bootsnipp.com/snippets/featured/easy-log-in-form
})
export class LoginFormComponent implements OnInit {

  email = '';
  password = '';

  constructor(private router: Router,
    private loginService: LoginService) {
    console.log(loginService.loggedIn);//DEBUG
  }
  ngOnInit() {
  }


  login() {

    this.loginService.login(this.email, this.password).then(response => {
      console.log('the login response:');
      console.log(response);
      this.router.navigate(['dashboard']);
    })
  }


}

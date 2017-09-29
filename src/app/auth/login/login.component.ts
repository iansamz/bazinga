import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
 
  state: string = '';
  error: any;

  constructor(public as : AuthService, private router: Router) {
    this.as.authState();
  }

  ngOnInit() {

  }

  ngOnDestroy(){
    
  }

  loginFb() {
    this.as.loginFb(this.error);
    // console.log(this.error)
  }

  loginGoogle() {
    this.as.loginGoogle(this.error);
    // console.log(this.error)
  }

  createUser(){
      this.as.createUser();
  }

}

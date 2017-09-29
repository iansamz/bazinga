import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../classes/user';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  state: string = '';
  error: any;

  constructor(public af: AngularFireAuth, public as: AuthService  ,private router: Router) {
    this.as.authState();
  }

  ngOnInit() {
  }

 
  loginFb() {
    this.as.loginFb(this.error);
  }

  loginGoogle() {
    this.as.loginGoogle(this.error);
  }

  createUser(){
      this.as.createUser();
  }
}

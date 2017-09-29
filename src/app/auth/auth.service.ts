import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import * as firebase from 'firebase/app';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {


  currentUser : any ;
  currentUserUid : any;
  user: any =  {
          uid: "",
          displayName: "",
          email: "",
          providerId: "",
          photoURL: "../assets/images/man.png",
          created: "",
          isAdmin: false,
          bio: null,
          skills: null,
          projects: null,
          phone : null,
          university : null,
          companyName : null,
          companyEmail: null,
          myJobs : [],
          myInternships : [],
          jobsGiven : [],
          internshipsGiven : []
        };
  ifUser : boolean = false;
  users : FirebaseListObservable<any> = this.db.list('/users');
  userSubject: Subject<any>;
  user1: Observable<firebase.User>;
  constructor(public af : AngularFireAuth, private router : Router, public db :AngularFireDatabase, public snackBar: MdSnackBar) { 
    this.authState();
    this.user1 = af.authState;
    console.log(this.user1)
    this.user1.subscribe(data=>{
      console.log(data)
    });
  }
  
  getUser(uid){
      this.users = this.db.list('/users', {
        query: {
        orderByChild: 'uid',
        equalTo: <string><any>uid
      }
    });
    this.users.subscribe((data:object) =>{
      if(data[0] !==null){
        this.user = data[0];
        this.user.photoURL = data[0].photoURL || "../assets/images/man.png";
      }else{
          this.user =  {
          uid: "",
          displayName: "",
          email: "",
          providerId: "",
          photoURL: "../assets/images/man.png",
          created: "",
          isAdmin: false,
          bio: null,
          skills: null,
          projects: null,
          phone : null,
          university : null,
          companyName : null,
          companyEmail: null,
          myJobs : [{},{}],
          myInternships : [{},{}],
          jobsGiven : [{},{}],
          internshipsGiven : [{},{}]
        };
      }
    });
  }

  authState(){
    this.af.authState.subscribe(auth => { 
      if(auth) {
        this.getUser(auth.uid);
      }
    });
  }
  
 
  getCurrentUser(){
    let authD = new Subject();
    this.af.authState.subscribe(auth => { 
      if(auth !==null){
        authD.next(auth.uid)
      }else{
        authD.next(this.user.uid)
      }
    });
    return authD
  }


  logout() {
    this.af.auth.signOut();
    // this.currentUser = firebase.auth().currentUser;
    this.currentUser = this.af.auth.currentUser
    this.router.navigateByUrl('/auth/login');
    this.user =  {
          uid: "",
          displayName: "",
          email: "",
          providerId: "",
          photoURL: "../assets/images/man.png",
          created: "",
          isAdmin: false,
          bio: null,
          skills: null,
          projects: null,
          phone : null,
          university : null,
          companyName : null,
          companyEmail: null,
          myJobs : [{},{}],
          myInternships : [{},{}],
          jobsGiven : [{},{}],
          internshipsGiven : [{},{}]
        };
        this.router.navigateByUrl('/home')
  }


  loginFb(error) {
    this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(
      (success) => {
          this.createUser();
          if(this.router.url === "/auth/login" || "auth/signup"){
            this.router.navigate(['/home']);
          }
        }).catch(
          (err) => {
          error = err;
          this.snackBar.open(error,"error", {
            duration: 10000,
          });
        })
  }

  loginGoogle(error) {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(
        (success) => {
          this.createUser();
          if(this.router.url === "/auth/login" || "auth/signup"){
            this.router.navigate(['/home']);
          }
        }).catch(
          (err) => {
          error = err;
          this.snackBar.open(error,"error", {
            duration: 10000,
          });
        })
  }

  createUser(){
          let userLogged = this.af.auth.currentUser;
          let uid = userLogged.uid;
          let userSearch = this.db.list('/users', {
            query: {
              orderByChild: 'uid',
              equalTo: userLogged.uid
            }
          });
          userSearch.subscribe(result =>{
            if(result.length == 0){
              let newUser : User = {
                uid: userLogged.uid,
                displayName: userLogged.displayName,
                email : userLogged.email,
                providerId: userLogged.providerId,
                photoURL: userLogged.photoURL,
                created : +Date.now(),
                isAdmin : false,
                phone : null,
                bio: null,
                skills: null,
                projects: null,
                university : null,
                companyName : null,
                companyEmail: null,
                myJobs : [{},{}],
                myInternships : [{},{}],
                jobsGiven : [{},{}],
                internshipsGiven : [{},{}]
              };
            let user : FirebaseListObservable<any>= this.db.list('/users');
            user.push(newUser);
            }
          });
  }
}

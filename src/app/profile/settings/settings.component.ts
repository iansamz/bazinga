import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CatsService } from '../cats.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
    

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  categories : any;
  dbUser :FirebaseListObservable<any>;
  user: any; 
  project: any;
  ifproj:boolean = false;
  ifUpload:boolean = false;
  error: any;
  message: any;
  universities : any;
  // storage:any;
  // storageRef : any;
  // dpRef: any;

  constructor(public snackBar : MdSnackBar,public as: AuthService,public cs: CatsService,public db: AngularFireDatabase, public ar: ActivatedRoute, public router:Router ) { 
    this.categories = this.cs.categories;
    this.universities - this.cs.universities;
    this.as.af.authState.subscribe(user=>{
      this.dbUser = this.db.list('/users/',{
        query:{
          orderByChild: 'uid',
          equalTo: user.uid
        }
      });
      this.dbUser.subscribe(user=>{
        this.user = user[0];
      });
    });
    
    
    // this.storageRef = firebase.storage().ref();

    // this.dpRef = this.storageRef.child('dps');
    
  }

  ngOnInit() {
    this.categories = this.cs.categories;
    this.universities = this.cs.universities;
  }

  changeDP(event){
    var files = event.srcElement.files;
    var file = files[0];

    // var fileRef = this.dpRef.child(this.user.uid);
    // var task = fileRef.put(file);
  }

  deleteAct(){

  }

  update(value){

    this.user.name = value.name;
    this.user.email = value.email;
    this.user.bio = value.bio;
    this.user.skills = value.skills;
    this.user.university = value.university;
    this.user.companyName = value.companyName || null;
    this.user.companyEmail = value.companyEmail || null;

     this.dbUser.update(this.user.$key,this.user)
     .then(
        (success) => {
          this.message = "Sync Completed" ;
          this.snackBar.open(this.message,"", {
            duration: 2000,
          });
          
      }).catch(
        (err) => {
          this.error = err;
          this.snackBar.open(this.error,"error", {
            duration: 2000,
          });
      });
     this.router.navigateByUrl('/user/profile/'+this.user.uid);
  }

  ifUp(){
    this.ifUpload = !this.ifUpload; 
  }

  seeMore(){
    this.router.navigateByUrl('/user/profile/'+ this.user.uid);
  }

  addProj(){
    this.router.navigateByUrl('/user/profile/createp');
  }

}

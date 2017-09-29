import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
}) 

export class DashComponent implements OnInit {
  ifUser : boolean = false;
  type : boolean = true;
  constructor(public as : AuthService, public af : AngularFireAuth, public router : Router){
    
  }
  ngOnInit(){
    // this.as.getCurrentUser().subscribe(auth=>{
    //   if(auth !== false){
    //     this.ifUser = true;
    //   }else{
    //     this.ifUser = false;
    //   }
       
    // }); 
    
  }

  login(){
    this.router.navigateByUrl('/user/auth/login');
  }

  logout(){
    this.as.logout();
  }

  dashClient(){
    this.router.navigateByUrl('/user/client/dashboard');
  }

  dashEmp(){
    this.router.navigateByUrl('/user/emp/dashboard');
  }

  addIJ(){
    this.router.navigateByUrl('/user/emp/addij');
  }
  
  clientJobs(){
    this.router.navigateByUrl('/user/client/new');
  }

  profile(){
    this.router.navigateByUrl('/user/profile/'+this.af.auth.currentUser.uid);
    this.router.navigateByUrl('/user/profile/'+this.af.auth.currentUser.uid+'?refresh=1');
  }
  
  settings(){
    this.router.navigateByUrl('/user/profile/settings');
    this.router.navigateByUrl('/user/profile/settings?refresh=1');
  }

  switch(){
    this.type = !this.type;
    if(this.type==false){
      this.router.navigateByUrl('/user/emp/clients');
    }else{
      this.router.navigateByUrl('/user/client/myjobs');
    }
  }
}


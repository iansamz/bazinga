import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // ifUser : boolean = false;
  // constructor(public as : AuthService, public af : AngularFireAuth, public router : Router){
    
  // }
  ngOnInit(){
    // this.as.getCurrentUser().subscribe(auth=>{
    //   if(auth !== false){
    //     this.ifUser = true;
    //   }else{
    //     this.ifUser = false;
    //   }
       
    // });
    
  }

  // login(){
  //   this.router.navigateByUrl('/auth/login');
  // }

  // logout(){
  //   this.as.logout();
  // }
  // home(){
  //   this.router.navigateByUrl('/home');
  // }
  // dash(){
  //   this.router.navigateByUrl('/dashboard/orders');
  // }
  // newO(){
  //   this.router.navigateByUrl('/order/new');
  // }
  // settings(){
  //   this.router.navigateByUrl('/dashboard/settings');
  // }
  // contact(){
  //   this.router.navigateByUrl('/contact');
  // }
  // active(){
  //   this.router.navigateByUrl('/admin/active');
  // }
  // comp(){
  //   this.router.navigateByUrl('/admin/complete');
  // }
}


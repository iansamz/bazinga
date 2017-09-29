import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { Application } from '../../classes/applications';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {

  id: number;
  intDb : FirebaseListObservable<any>;
  internship = {
      intId: "Loading...",
      intTitle : "Loading...",
      intInfo : "Loading...",
      intCategories : [{0:"Angular"}],
      estDuration : "Loading...",
      empId : "Loading...",
      empName : "Loading...",
      intApplicants : "Loading...",
      isClosed: "Loading...",
  };
  appDb: FirebaseListObservable<any>;
  appI: Subject<any>;
  appId: number;
  uid: any;
  error: any;
  valid: boolean = false;
  user: any;
  constructor(public snackBar: MdSnackBar, public router: Router, public ar:ActivatedRoute, public as : AuthService, public db : AngularFireDatabase) { 
    
  }

  ngOnInit() {
    this.id = +(this.ar.snapshot.params['id']);
    this.intDb = this.db.list('/internships/',{
        query:{
          orderByChild: 'intId',
          equalTo: this.id
        }
    });
   
    
    this.as.getCurrentUser().subscribe(uid=>{
      this.intDb.subscribe(intz=>{
        this.internship = intz[0];
        if (this.internship.empId == this.uid){
          this.error= "Cannot apply to Internship you set yourself";
          this.snackBar.open(this.error,"error", {
            duration: 2000,
          });
          this.valid = false
        }else{
          this.valid = true;
        }
      });
      let search = this.db.list('/applications/'+this.id,{
        query:{
          orderByChild: 'cId',
          equalTo: uid
        }
      });
      search.subscribe(application=>{
        if(application.length == 0){
          this.valid = true;
        }else{
          this.valid = false;
          this.error= "Already Applied";
          this.snackBar.open(this.error,"error", {
            duration: 2000,
          });
        }
        
      });
      let appSearch = this.db.list('/applications/'+ this.id, {
        query: {
          orderByChild: 'appId',
          limitToLast: 1
        }
      });

      this.appI = new Subject();
      appSearch.subscribe(application=>{
        if(application.length == 0){
          this.appI.next(0);
        }else{
          this.appI.next(application[0].appId);
        }
      });
      this.appI.subscribe(data=>{
        this.appId = (data + 1);
      });
      this.appDb = this.db.list('/applications/' + this.id);
      this.uid = uid;
    });
    
  }

  apply(value){
      let application : Application = {
        appId: this.appId,
        empId: this.internship.empId,
        cId: this.uid,
        cName: this.as.user.displayName,
        photoURL: this.as.user.photoURL,
        cv: value.description,
      }
      this.appDb.push(application);
      
      this.router.navigateByUrl('/user/client/dashboard');
    
  }
  onSubmit(form){
    if(this.valid){
      this.apply(form.value);
    }else{
      this.snackBar.open(this.error,"error", {
        duration: 2000,
      });
    }
  }


}

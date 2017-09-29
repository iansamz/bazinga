import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../../auth/auth.service';
import { Subject } from 'rxjs/Subject';
import { Jobs } from '../../classes/jobs';
import { Internship } from '../../classes/internship';
import { Router } from '@angular/router';
import { CatsService } from '../cats.service';
import { MdSnackBar } from '@angular/material';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-addij',
  templateUrl: './addij.component.html',
  styleUrls: ['./addij.component.css']
})
export class AddijComponent implements OnInit {

  intI : Subject<any>;
  intDb : FirebaseListObservable<any>;
  jobI : Subject<any>;
  jobDb : FirebaseListObservable<any>;
  IId : number;
  jId : number;
  uid : any;
  dbUser : FirebaseListObservable<any>;
  user: any;
  error: any;
  message: any;

  constructor(public snackBar : MdSnackBar, public as: AuthService, public db : AngularFireDatabase, public router:Router, public cs : CatsService) { }

  ngOnInit() {

      let intSearch = this.db.list('/internships/', {
        query: {
        orderByChild: 'intId',
        limitToLast: 1
        }
      });

      this.intI = new Subject();
      intSearch.subscribe((internship)=>{
        if(internship.length == 0){
          this.intI.next(0);
        }else{
          this.intI.next(internship[0].intId);
        }
      });
      this.intI.subscribe(data=>{
        this.IId = (data + 1);
      });
      this.intDb = this.db.list('/internships/');

      let jobSearch = this.db.list('/jobs/', {
        query: {
        orderByChild: 'jobId',
        limitToLast: 1
        }
      });

      this.jobI = new Subject();
      jobSearch.subscribe((job)=>{
        if(job.length == 0){
          this.jobI.next(0);
        }else{
          this.jobI.next(job[0].jobId);
        }
      });
      this.jobI.subscribe(data=>{
        this.jId = (data + 1);
      });
      
      this.jobDb = this.db.list('/jobs/');
  }

  createI(value){
    
    let internship: Internship = {
      intId: this.IId,
      intTitle : value.title,
      intInfo : value.description,
      intCategories : value.categories,
      estDuration : value.estDuration,
      empId : this.as.user.uid,
      empName : this.as.user.displayName,
      intApplicants : null,
      isClosed: false
    };

    this.intDb.push(internship)
    .then(
        (success) => {
          this.message = "Internship Added" ;
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
    
    let userDb = this.db.list('/users/',{
      query:{
        orderByChild: "uid",
        equalTo: this.as.user.uid
      }
    });
    userDb.subscribe(user=>{
      this.user = user[0];
      let userDb2 = this.db.list('/users/'+this.user.$key+'/internshipsGiven');
      userDb2.push(internship)
      .then(
        (success) => {
          this.message = "Sync Complete. " ;
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
    });
    
    this.router.navigateByUrl('/user/emp/dashboard');
  }

  createJ(value){
    let job: Jobs = {
      jobId: this.jId,
      jobTitle: value.title,
      jobInfo: value.description,
      jobBudget: value.budget,
      jobCategories: value.categories,
      jobDuration: value.estDuration,
      projects: value.link,
      empId: this.as.user.uid,
      empName: this.as.user.displayName,
      isComplete: false,
      isTaken: false
    }
    this.jobDb.push(job)
    .then(
        (success) => {
          this.message = "Job Added" ;
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
    
    let userDb = this.db.list('/users/',{
      query:{
        orderByChild: "uid",
        equalTo: this.as.user.uid
      }
    });
    userDb.take(1).subscribe(user=>{
      this.user = user[0];
      let userDb2 = this.db.list('/users/'+this.user.$key+'/jobsGiven');
      userDb2.push(job)
      .then(
        (success) => {
          this.message = "Sync Complete. " ;
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
    });

    this.router.navigateByUrl('/user/emp/dashboard');

  }
  appendObjTo(thatArray, objToAppend) {
    return Object.freeze(thatArray.concat(objToAppend));
  }

}

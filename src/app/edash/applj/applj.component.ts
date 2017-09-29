import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../../auth/auth.service';
import { MdSnackBar, MdDialog, MdDialogRef } from '@angular/material';
import { DialogCloseIComponent } from '../dialog-close-i/dialog-close-i.component'
import { DialogAcceptComponent } from '../dialog-accept/dialog-accept.component'
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-applj',
  templateUrl: './applj.component.html',
  styleUrls: ['./applj.component.css']
})
export class AppljComponent implements OnInit {

  id: number;
  jobDb : any;
  jobTDb : any;
  quoteDb : any;
  job = {
    jobId: 0,
    jobTitle: "Loading",
    jobInfo: "Loading",
    jobBudget: "Loading",
    jobCategories: "Loading",
    jobDuration: "Loading",
    projects: "Loading",
    empId: "Loading",
    empName: "Loading",
    isComplete: false,
    isTaken: false,
    $key : null
  }
  winner ={
    uid : "",
    displayName : "",
    photoURL : ""
  };
  quotes : any;
  error : any;
  message : any;
  ifTaken : boolean;
  dialogRef : MdDialogRef<any>;
  constructor(public dialog: MdDialog,public snackBar: MdSnackBar, public as : AuthService, public router : Router,public ar : ActivatedRoute, public db : AngularFireDatabase, public af : AngularFireDatabase) { }

  ngOnInit() {
    //get id from route
    this.id = +(this.ar.snapshot.params['id']);

    //get job
    this.jobDb = this.db.list('/jobs/',{
      query:{
        orderByChild: 'jobId',
        equalTo: this.id
      }
    });

    this.jobDb.subscribe(jobs=>{
      this.job = jobs[0];
      this.ifTaken = this.job.isTaken;
      this.jobTDb = this.db.list('/jobsTaken/'+ this.id);
      //check if job is taken
      
        //if taken get the winner
        this.jobTDb.subscribe(winner=>{
          this.winner = winner[0];
        })
      
        //search for quotes
        this.quoteDb = this.db.list('/quotes/'+ this.id);

        this.quoteDb.take(1).subscribe(quotes=>{
          this.quotes = quotes;
        });

      
    });
    
  }

  view(uid){
    this.router.navigateByUrl('/user/profile/'+ uid);
  }
  
  close(){
    this.dialogRef = this.dialog.open(DialogCloseIComponent,{
      data: this.job.jobTitle
    });
    this.dialogRef.afterClosed().subscribe(result=>{
      if(result == true){
        // close internship
        this.closing();
      }
    });
    
  }

  closing(){
    let job = this.job;
    job.isTaken = true; 
    this.ifTaken = true;
    this.jobDb.update(this.job.$key, job)
    .then(
      (success) => {
        this.message = "Job Closed" ;
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

    this.jobTDb.subscribe(winner=>{
      if(winner){
        this.winner = winner ;
      }
    });  
  }

  accept(uid,name){
    this.dialogRef = this.dialog.open(DialogAcceptComponent,{
      data: name
    });
    this.dialogRef.afterClosed().subscribe(result=>{
      if(result == true){
        this.select(uid);
      }
    });

  }

  select(uid){

    //get user details
    let userTempDb = this.db.list('/users/',{
      query:{
        orderByChild:'uid',
        equalTo: uid
      }
    });
    
    userTempDb.take(1).subscribe(tempUser=>{
      let userTemp = tempUser[0];
      // push the user to job taken db
      this.jobTDb.push(userTemp)
      .then(
        (success) => {
          this.message = "Applicant assigned to job" ;
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

      
      let job = this.job;

      job.isTaken = true;
      //add job to user.myJobs
      let userDb = this.db.list('/users/' + userTemp.$key + '/myJobs');
      userDb.update(userTemp.$key, job);

      // update job Dets
      this.jobDb.update(this.job.$key , job )
      .then(
        (success) => {
          this.message = "Sync complete" ;
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

      this.jobTDb.subscribe(winner=>{
        this.winner = winner[0];
      });
      this.ifTaken = true;


    });
    
    this.router.navigateByUrl('/user/emp/jobapps/'+ this.id);
  }

}

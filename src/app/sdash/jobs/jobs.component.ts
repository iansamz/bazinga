import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  dbJobs: FirebaseListObservable<any>;
  jobs : any;
  dbInts : FirebaseListObservable<any>;
  internships : any;

  constructor(public db : AngularFireDatabase, public router : Router) { 
    this.dbJobs = db.list('/jobs',{
      query: {
        orderByChild: 'isTaken',
        equalTo: false,
        limitToLast: 15
      }
    });
    this.dbInts = db.list('/internships',{
      query: {
        orderByChild: 'isClosed',
        equalTo : false,
        limitToLast: 15
      }
    });
  }

  ngOnInit() {
    this.dbJobs.subscribe(jobz =>{
      this.jobs = jobz;
    });
    this.dbInts.subscribe(intz=>{
      this.internships = intz;
    })
  }
  viewi(value){
    this.router.navigateByUrl('/user/client/applyi/'+ value);
  }
  viewj(value){
    this.router.navigateByUrl('/user/client/applyj/'+ value);
  }

}

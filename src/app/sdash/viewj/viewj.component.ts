import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-viewj',
  templateUrl: './viewj.component.html',
  styleUrls: ['./viewj.component.css']
})
export class ViewjComponent implements OnInit {

  id : number;
  job = {
      jobId: 0,
      jobTitle: "Loading...",
      jobInfo: "Loading...",
      jobBudget: 0,
      jobCategories: [{0:"Angular"}],
      jobDuration: 1,
      projects: "Loading...",
      empId: "Loading...",
      empName: "Loading...",
      isComplete: "Loading...",
      isTaken: false
  };

  constructor(public router : Router, public ar : ActivatedRoute, public db : AngularFireDatabase ) { }

  ngOnInit() {
    this.id = +this.ar.snapshot.params['id'];

    let jobSearch = this.db.list('/jobs/',{
      query:{
        orderByChild: 'jobId',
        equalTo: this.id
      }
    });

    jobSearch.subscribe(job=>{
      this.job = job[0];
    });
  }

  viewe(id){
    this.router.navigateByUrl('/user/profile/'+ id);
  }

}

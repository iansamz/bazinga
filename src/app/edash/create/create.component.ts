import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Jobs } from '../../classes/jobs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  jobs: FirebaseListObservable<any>;
  constructor(public db : AngularFireDatabase) { 
    this.jobs = db.list('/jobs');
  }

  ngOnInit() {

    // let jobeg :Jobs = {
    //   jobId : 'jb'+ 1,
    //   jobTitle: "Title",
    //   jobInfo: "Info",
    //   jobBudget: 20000,
    //   jobCatergory: "categoryA",
    //   jobDuration: "time",
    //   projects: "www.facebook.com",
    //   empId: "empid",
    //   empName: "empname",
    //   isComplete: false,
    //   isTaken: false
    // }
    // this.jobs.push(jobeg);

  }

}

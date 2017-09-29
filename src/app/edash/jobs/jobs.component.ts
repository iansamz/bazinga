import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Jobs } from '../../classes/jobs'

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  dbJobs: FirebaseListObservable<any>;
  jobs : any;
  jobP : any;
  jobE : any;
  constructor(public db : AngularFireDatabase) { 
    this.dbJobs = db.list('/jobs');
  }

  ngOnInit() {
    this.dbJobs.subscribe(jobz=>{
      this.jobs = jobz;
      this.jobP = this.jobs.filter(this.inProgress);
      this.jobE = this.jobs.filter(this.isComplete);
        // console.log(this.jobs)
        // console.log(this.jobP)
        // console.log(this.jobE)
    });
    
  }
  
  appendObjTo(thatArray, objToAppend) {
    return Object.freeze(thatArray.concat(objToAppend));
  }

  inProgress(job){
    return (job.isComplete === false && job.isTaken === true);
  }
  isComplete(job){
    return (job.isComplete === true);
  }
}

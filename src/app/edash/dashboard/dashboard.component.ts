import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  jobs: any;
  internships : any;
  constructor(public db : AngularFireDatabase, public router : Router, public as: AuthService) { 
    this.as.user1.subscribe(data=>{
      console.log(data)
    })
  }

  ngOnInit() {
    this.as.af.authState.subscribe(auth=>{
      let userSearch = this.db.list('/users/',{
        query:{
          orderByChild : 'uid',
          equalTo: auth.uid
        }
      });
      
      userSearch.subscribe(user=>{
        let key = user[0].$key;
        let dbJobs : FirebaseListObservable<any> = this.db.list('/users/'+ key + '/jobsGiven');
        let dbInternships : FirebaseListObservable<any> = this.db.list('/users/'+ key + '/internshipsGiven');

        dbInternships.subscribe(internships=>{
          this.internships = internships;
        });

        dbJobs.subscribe(jobs=>{
          this.jobs = jobs;
        });


      });
    });
  }

  viewi(id){
    this.router.navigateByUrl('/user/emp/intapps/'+ id);
  }

  viewj(id){
    this.router.navigateByUrl('/user/emp/jobapps/'+ id);
  }
}

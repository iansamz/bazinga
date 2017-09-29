import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../classes/user';


@Component({
  selector: 'app-myjobs',
  templateUrl: './myjobs.component.html',
  styleUrls: ['./myjobs.component.css']
})
export class MyjobsComponent implements OnInit {

  jobs: any;
  quotes : any;
  internships : any;
  constructor(public db : AngularFireDatabase, public router : Router, public as: AuthService) { 
    this.as.af.authState.subscribe(data=>{
      console.log(data);
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
        let dbJobs : FirebaseListObservable<any> = this.db.list('/users/'+ key + '/myJobs');
        let dbInternships : FirebaseListObservable<any> = this.db.list('/users/'+ key + '/myInternships');
        let dbQuotes : FirebaseListObservable<any> = this.db.list('/users/'+ key + '/quotes');

        dbInternships.subscribe(internships=>{
          this.internships = internships;
        });

        dbQuotes.subscribe(quotes=>{
          this.quotes = quotes;
        });

        dbJobs.subscribe(jobs=>{
          this.jobs = jobs;
        });


      });
    });
  }

  viewi(value){
    this.router.navigateByUrl('/user/client/viewi/'+ value);
  }

  viewj(value){
    this.router.navigateByUrl('/user/client/viewj/'+ value);
  }

}

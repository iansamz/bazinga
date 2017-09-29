import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CatsService } from '../cats.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profdet',
  templateUrl: './profdet.component.html',
  styleUrls: ['./profdet.component.css']
})
export class ProfdetComponent implements OnInit {

  categories : any;
  dbUser :FirebaseListObservable<any>;
  user: any = this.as.user;
  id:any;
  myInternships : any;
  myJobs : any;
  internshipsGiven : any;
  jobsGiven : any;

  constructor(public as: AuthService,public cs: CatsService,public db: AngularFireDatabase ,public router:Router ,public ar : ActivatedRoute,) {
    this.categories = this.cs.categories;
    this.id = this.ar.snapshot.params['id'];
      this.dbUser = this.db.list('/users/',{
        query:{
          orderByChild: 'uid',
          equalTo: this.id
        }
    });
      this.dbUser.subscribe(user=>{
        this.user = user[0];
         let MIDb = this.db.list('/users/'+this.user.$key+ '/myInternships');
         MIDb.subscribe(internships=>{
          this.myInternships = internships;
         });
         let MJDb = this.db.list('/users/'+this.user.$key+ '/myJobs');
         MJDb.subscribe(jobs=>{
          this.myJobs = jobs;
         });
         let IGDb = this.db.list('/users/'+this.user.$key+ '/internshipsGiven');
         IGDb.subscribe(internships=>{
          this.internshipsGiven = internships;
         });
         let JGDb = this.db.list('/users/'+this.user.$key+ '/jobsGiven');
         JGDb.subscribe(jobs=>{
          this.jobsGiven = jobs;
         });
      });
   }

  ngOnInit() {
    
  }

}

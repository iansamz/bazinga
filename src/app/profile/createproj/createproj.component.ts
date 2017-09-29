import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../../auth/auth.service';
import { Subject } from 'rxjs/Subject';
import { CatsService } from '../cats.service';
import { Project } from '../../classes/projects';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createproj',
  templateUrl: './createproj.component.html',
  styleUrls: ['./createproj.component.css']
})
export class CreateprojComponent implements OnInit {

  projI : Subject<any>;
  projDb : FirebaseListObservable<any>;
  Id : number;
  uid : any;
  constructor( public as: AuthService, public db : AngularFireDatabase, public cs: CatsService,public router:Router) { }

  ngOnInit() {
    this.as.getCurrentUser().subscribe(auth=>{
      let projSearch = this.db.list('/projects/'+ auth, {
        query: {
        orderByChild: 'projectId',
        limitToLast: 1
        }
      });

      this.projI = new Subject();
      projSearch.subscribe((project)=>{
        if(project.length == 0){
          this.projI.next(0);
        }else{
          this.projI.next(project[0].projectId);
        }
      });
      this.projI.subscribe(data=>{
        this.Id = (data + 1);
      });
      this.projDb = this.db.list('/projects/'+ auth);
      this.uid = auth;
    });
  }

  createP(value){
    console.log(value);
    let project : Project = {
      title : value.title,
      projectId : this.Id,
      link : value.link,
      clientName : value.clientName,
      clientEmail : value.clientEmail,
      completionDate : "adsasd",
      description : value.description,
      freeLId : this.uid,
      categories : value.category
    }

    
    
    this.projDb.push(project);

    this.router.navigateByUrl('/user/profile/'+ this.uid);
  }

}

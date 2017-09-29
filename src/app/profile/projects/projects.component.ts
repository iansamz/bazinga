import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projectDb : FirebaseListObservable<any>;
  projects : any;
  @Input() public uid : any;

  constructor(public db: AngularFireDatabase) {
    
    
   }

  ngOnInit() {
    this.projectDb = this.db.list('/projects/'+this.uid);
    this.projectDb.subscribe(projs=>{
      this.projects = projs;
    });
  }

}

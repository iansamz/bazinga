import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-viewi',
  templateUrl: './viewi.component.html',
  styleUrls: ['./viewi.component.css']
})
export class ViewiComponent implements OnInit {
  
  id : number;
  internship = {
      intId: "Loading...",
      intTitle : "Loading...",
      intInfo : "Loading...",
      intCategories : [{0:"Angular"}],
      estDuration : 1,
      empId : "Loading...",
      empName : "Loading...",
      intApplicants : "Loading...",
      isClosed: "Loading...",
  };

  constructor(public router : Router, public ar : ActivatedRoute, public db : AngularFireDatabase ) { }

  ngOnInit() {
    this.id = +this.ar.snapshot.params['id'];

    let intSearch = this.db.list('/internships/',{
      query:{
        orderByChild: 'intId',
        equalTo: this.id
      }
    });

    intSearch.subscribe(ints=>{
      this.internship = ints[0];
    });
  }

  viewe(id){
    this.router.navigateByUrl('/user/profile/'+ id);
  }

}

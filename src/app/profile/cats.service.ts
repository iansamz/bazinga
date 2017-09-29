import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class CatsService {
  dbCategories : FirebaseListObservable<any>;
  categories : any;
  dbUniversities : FirebaseListObservable<any>;
  universities : any;
  constructor(public db : AngularFireDatabase) { 
    this.dbCategories = db.list('/categories');
    this.dbCategories.subscribe(cats=>{
      this.categories = cats;
    });
    this.dbUniversities = db.list('/universities');
    this.dbUniversities.subscribe(unis=>{
      this.universities = unis;
    });
  }

  


}

import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Quotes } from '../../classes/quotes';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  dbQuotes: FirebaseListObservable<any>;
  quotes : any;


  constructor(public db : AngularFireDatabase, public af: AngularFireAuth) { 
   
  }

  ngOnInit() {
     
      this.dbQuotes = this.db.list('/quotes',{
        query: {
          equalTo: this.af.auth.currentUser,
          limitToLast: 15
        }
      });
      this.dbQuotes.subscribe(quotez =>{
        this.quotes = quotez;
      });
    
  }
}

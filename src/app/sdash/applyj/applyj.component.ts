import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { Quotes } from '../../classes/quotes';
import { MdSnackBar } from '@angular/material';
import 'rxjs/add/operator/take';  

@Component({
  selector: 'app-applyj',
  templateUrl: './applyj.component.html',
  styleUrls: ['./applyj.component.css']
})
export class ApplyjComponent implements OnInit {

  id: number;
  jobDb : FirebaseListObservable<any>;
  job = {
      jobId: 0,
      jobTitle: "Loading...",
      jobInfo: "Loading...",
      jobBudget: 0,
      jobCategories: [{0:"Angular"}],
      jobDuration: "Loading...",
      projects: "Loading...",
      empId: "Loading...",
      empName: "Loading...",
      isComplete: "Loading...",
      isTaken: false
  };
  quoteDb: FirebaseListObservable<any>;
  quoteI: Subject<any>;
  quoteId: number;
  uid: any;
  error: any;
  message: any;
  valid: boolean = false;
  user: any;
  budget: any;

  constructor(public snackBar: MdSnackBar, public router: Router, public ar:ActivatedRoute, public as : AuthService, public db : AngularFireDatabase) { }

  ngOnInit() {
    this.id = +(this.ar.snapshot.params['id']);
    this.jobDb = this.db.list('/jobs/',{
        query:{
          orderByChild: 'jobId',
          equalTo: this.id
        }
    });
   
    
    this.as.getCurrentUser().subscribe(uid=>{
      this.jobDb.subscribe(jobz=>{
        this.job = jobz[0];
        
        switch(this.job.jobBudget){
          case 0:{
            this.budget = "Not Sure";
            break;
          }
          case 1:{
            this.budget = "5000-10000 shillings";
            break;
          }
          case 2:{
            this.budget = "10000-20000 shillings";
            break;
          }
          case 3:{
            this.budget = "20000-50000 shillings";
            break;
          }
          case 4:{
            this.budget = "50000-100000 shillings";
            break;
          }
          case 5:{
            this.budget = "100000-above shillings";
            break;
          }
        }

        if (this.job.empId == this.uid){
          this.error= "Cannot give quote to Job you set yourself";
          this.snackBar.open(this.error,"error", {
            duration: 2000,
          });
          this.valid = false;
        }else{
          this.valid = true;
        }
      });
      let search = this.db.list('/quotes/'+this.id,{
        query:{
          orderByChild: 'cId',
          equalTo: uid
        }
      });
      search.subscribe(quote=>{
        if(quote.length == 0){
          this.valid = true;
        }else{
          this.valid = false;
          this.error= "Already given";
          this.snackBar.open(this.error,"error", {
            duration: 2000,
          });
        }
        
      });
      let quoteSearch = this.db.list('/quotes/'+ this.id, {
        query: {
          orderByChild: 'quoteId',
          limitToLast: 1
        }
      });

      this.quoteI = new Subject();
      quoteSearch.subscribe(quote=>{
        if(quote.length == 0){
          this.quoteI.next(0);
        }else{
          this.quoteI.next(quote[0].quoteId);
        }
      });
      this.quoteI.subscribe(data=>{
        this.quoteId = (data + 1);
      });
      this.quoteDb = this.db.list('/quotes/' + this.id);
      this.uid = uid;
    });
    
  }
  addQuote(value){
      let quote : Quotes = {
        quoteId: this.quoteId,
        jobId: +this.id,
        freeLId: this.as.user.uid,
        freeLName: this.as.user.displayName,
        freeLURL: this.as.user.photoURL,
        amount: value.quoteAmount,
        quote: value.description
      }

      let searchDb = this.db.list('/quotes/' + this.id,{
        query:{
          orderByChild: 'freeLId',
          equalTo: this.as.user.uid
        }
      });
      
      searchDb.subscribe(quotes=>{
        if(quotes.length == 0){
          this.quoteDb.push(quote)
          .then(
              (success) => {
                this.message = "Quote added. " ;
                this.snackBar.open(this.message,"", {
                  duration: 2000,
                });
                
            }).catch(
              (err) => {
                this.error = err;
                this.snackBar.open(this.error,"error", {
                  duration: 2000,
                });
            });
          let userDb = this.db.list('/users/',{
            query:{
              orderByChild: "uid",
              equalTo: this.as.user.uid
            }
          });
          userDb.take(1).subscribe(user=>{
            this.user = user[0];
            let userDb2 = this.db.list('/users/'+this.user.$key+'/quotesGiven');
            userDb2.push(quote)
            .then(
              (success) => {
                this.message = "Sync Complete. " ;
                this.snackBar.open(this.message,"", {
                  duration: 2000,
                });
                
            }).catch(
              (err) => {
                this.error = err;
                this.snackBar.open(this.error,"error", {
                  duration: 2000,
                });
            });
          });
          
          this.router.navigateByUrl('/user/client/dashboard');
        }else{
          this.error = "You have already given out quote";
            this.snackBar.open(this.error,"error", {
               duration: 2000,
            });
        }
      })
      
    
  }
  onSubmit(form){
    if(this.valid){
      this.addQuote(form.value);
    }else{
      this.snackBar.open(this.error,"error", {
        duration: 2000,
      });
    }
  }

}

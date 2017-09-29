import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../../auth/auth.service';
import { MdSnackBar, MdDialog, MdDialogRef } from '@angular/material';
import { DialogCloseIComponent } from '../dialog-close-i/dialog-close-i.component'
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-appl',
  templateUrl: './appl.component.html',
  styleUrls: ['./appl.component.css']
})
export class ApplComponent implements OnInit {

  id : number;
  intDb : any;
  appDb : FirebaseListObservable<any>;
  intTDb: FirebaseListObservable<any>;
  internship = {
      intId: "Loading...",
      intTitle : "Loading...",
      intInfo : "Loading...",
      intCategories : [{0:"Angular"}],
      estDuration : "Loading...",
      empId : "Loading...",
      empName : "Loading...",
      intApplicants : "Loading...",
      isClosed: false,
      $key: null
  };
  interns =[
    {
      uid:"",
      photoURL:"",
      displayName:""
    }
  ];
  applicants : any;
  error : any;
  message : any;
  ifClosed : boolean;
  dialogRef : MdDialogRef<any>;

  constructor(public dialog: MdDialog,public snackBar: MdSnackBar, public as : AuthService, public router : Router,public ar : ActivatedRoute, public db : AngularFireDatabase, public af : AngularFireDatabase) {

   }

  ngOnInit() {
    this.id = +(this.ar.snapshot.params['id']);

    this.intDb =this.db.list('/internships',{
      query:{
        orderByChild: 'intId',
        equalTo: this.id
      }
    });
    this.intDb.take(1).subscribe(internship=>{

      this.internship = internship[0];
      this.ifClosed = this.internship.isClosed; 
      this.intTDb = this.db.list('/internshipsTaken/'+ this.id);  

      if(this.ifClosed){

        this.intTDb.subscribe(interns=>{
          this.interns = interns;
        });

      }else{
        this.appDb = this.db.list('/applications/'+ this.id);

        this.appDb.subscribe(applicants=>{
          this.applicants = applicants;
        });

      }
    });
  }

  view(uid){
    this.router.navigateByUrl('/user/profile/'+ uid);
  }

  accept(uid){

    // Search interns taken in Db 
    let intTakenDb = this.db.list('/internshipsTaken/'+ this.id,{
      query:{
        orderByChild: 'uid',
        equalTo: uid
      }
    });

    intTakenDb.subscribe(internships=>{

      //check if already accepted...if not then
      if(internships.length == 0){

        //get user details from database
        let userTempDb = this.db.list('/users/',{
          query:{
            orderByChild:'uid',
            equalTo: uid
          }
        });

        userTempDb.take(1).subscribe(tempUser=>{
          //push them to applicants accepted as interns
          let userTemp = tempUser[0];
          intTakenDb.push(userTemp)
          .then(
              (success) => {
                this.message = "Internship Added" ;
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

            //add internships in user Db
                let userDb2 = this.db.list('/users/'+userTemp.$key+'/myInternships');
                userDb2.push(this.internship)
                  .then(
                    (success) => {
                      this.message = "Internship Added" ;
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

      }else{
        this.error = "Already Accepted" ;
        this.snackBar.open(this.error,"", {
          duration: 2000,
        });
      }
    });
  } 

  close(){
    this.dialogRef = this.dialog.open(DialogCloseIComponent,{
      data: this.internship.intTitle
    });
    this.dialogRef.afterClosed().subscribe(result=>{
      if(result == true){
        this.true()
      }
    });
    
  }

  true(){
    let int = this.internship;
    int.isClosed = true; 
    this.ifClosed = true;
    this.intDb.update(this.internship.$key, int)
    .then(
            (success) => {
              this.message = "Internship Closed" ;
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

    this.intTDb.subscribe(interns=>{
      this.interns = interns;
    });  
  }

}

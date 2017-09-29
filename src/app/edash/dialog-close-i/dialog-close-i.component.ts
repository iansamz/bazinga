import { Component, OnInit, Inject} from '@angular/core';
import { MdDialogRef,MD_DIALOG_DATA } from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-dialog-close-i',
  templateUrl: './dialog-close-i.component.html',
  styleUrls: ['./dialog-close-i.component.css']
})
export class DialogCloseIComponent implements OnInit {
  
  message : any;
  error : any;
  constructor(public snackBar: MdSnackBar, public db: AngularFireDatabase, public dialogRef: MdDialogRef<any>, @Inject(MD_DIALOG_DATA) public data: any ) { }

  ngOnInit() {
  }
  }

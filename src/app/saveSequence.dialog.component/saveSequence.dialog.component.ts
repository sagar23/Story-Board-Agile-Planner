
import { MatCardModule } from '@angular/material/card';
import { Component, Input, OnInit ,Output, EventEmitter,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'saveSeq',
  templateUrl: 'saveSequence.dialog.component.html',
  styleUrls: ['saveSequence.dialog.component.css'],

})
export class saveSequenceDialog implements OnInit {
  
    public seqName : String;

  constructor(public dialogRef: MatDialogRef<saveSequenceDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }


}
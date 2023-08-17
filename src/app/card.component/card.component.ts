import { MatCardModule } from '@angular/material/card';
import { Component, Input, OnInit ,Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { cardDialogComponent } from '../card.dialog.component/card.dialog.component'

@Component({
  selector: `card`,
  templateUrl:`
  <mat-card class="card" (click)="openDialog()">
  <mat-card-header>
    <div mat-card-avatar class="example-header-image"></div>
    <mat-card-title >{{taskName}}</mat-card-title>
    <mat-card-subtitle>{{taskDesc}}</mat-card-subtitle>
  </mat-card-header>
</mat-card>
`,
  styleUrls: ['card.component.css'],

})
export class CardComponent implements OnInit {
  @Output() cardDeleted = new EventEmitter();
  @Input() Object: any;
  public taskName: String;
  public taskAssigned: String;
  public taskDesc: String;
  public taskComments: String;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.Object);
    this.assignToCard();
  }
  assignToCard() {
    this.taskName = this.Object.taskName;
    this.taskAssigned = this.Object.taskAssigne;
    this.taskDesc = this.Object.taskDesc;
    this.taskComments = this.Object.taskComments;
  }

  openDialog() {
    let dialogRef = this.dialog.open(cardDialogComponent, {
      panelClass: 'app-full-bleed-dialog',
      width: '500px',
      data: this.Object
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if(result.hasOwnProperty('delete')> -1){
          this.cardDeleted.emit(result);
      }else{
        console.log('The dialog was closed' + JSON.stringify(result));
        return result;
      }
      
    });
  }

}

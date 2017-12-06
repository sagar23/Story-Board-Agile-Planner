
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskDetails } from './TaskDetails'

@Component({
    selector: 'create-dialog-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

    public userTask = new TaskDetails("","","","");

    constructor(public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
    }
    onNoClick(): void {
        this.dialogRef.close();
    }

}

import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GridDetails } from './GridDetail'

@Component({
    selector: 'create-grid-dialog',
    templateUrl: './grid.dialog.component.html',
    styleUrls: ['./grid.dialog.component.css']
})
export class GridDialogComponent implements OnInit {

    public gridList = new GridDetails("","",[]);

    constructor(public dialogRef: MatDialogRef<GridDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
    }
    onNoClick(): void {
        this.dialogRef.close();
    }

}
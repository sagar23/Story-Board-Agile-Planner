import { Component, OnInit, Inject , ViewEncapsulation } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {TableService} from '../table.component/table.service'
@Component({
    selector: 'create-card-dialog',
    templateUrl: './card.dialog.component.html',
    styleUrls: ['./card.dialog.component.css'],
    providers:[TableService]
})
export class cardDialogComponent implements OnInit {

    public editFlag : boolean;
    public deleteFlag : boolean;

    constructor(public dialogRef: MatDialogRef<cardDialogComponent>,private tableService: TableService,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.editFlag= false;
        console.log("ye jo des  " + JSON.stringify(this.data));
    }

    editEnabled(){
        this.editFlag = true;
        this.deleteFlag=true;
    }

    save(){
        console.log("changed data "+JSON.stringify(this.data));
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    deleteCard(data){
        this.tableService.deleteCard(data).subscribe(data => {
                console.log( data);
        });;
    }

}

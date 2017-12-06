import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import 'rxjs/add/operator/map'
import { DialogComponent } from '../dialog.component/dialog.component'
import { CardComponent } from '../card.component/card.component'
import { GridDialogComponent } from '../grid.dialog.component/grid.dialog.component'
import { saveSequenceDialog } from '../saveSequence.dialog.component/saveSequence.dialog.component'
import {DragulaModule , DragulaService} from "ng2-dragula"
import * as _ from "lodash";
import { TableService } from './table.service'

@Component({
  selector: 'app-table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [TableService]
})
export class TableComponent implements OnInit {

  public gridList: any[];
  public clickedGridId: any;
  public gridAccId: any;
  public gridBck;
  public saveSeq;
  public openList ;


  constructor(private http: HttpClient, public dialog: MatDialog,
    private dragulaService: DragulaService, private tableService: TableService) {

    this.dragulaService.setOptions('bag', {
      revertOnSpill: false
    });
  }

  ngOnInit() {
    this.gridList = [];

    this.dragulaService.drag
      .subscribe(value => {
        const [bagName, e, el] = value;
        console.log('id is:', e.dataset.id);
      });

    this.dragulaService.drop
      .subscribe(
      data => {
        console.log('Something went right!');
        const [bagName, e, el] = data;
        console.log('id is:', data)
        setTimeout(() => {
          this.onDrop();
        }, 1000);

      },
      err => {
        console.log('Something went wrong!');
      });
  }

  onDrop = function () {
    var toDelete;
    var fromDelete;
    var toAdd;
    console.log("grid latest " + JSON.stringify(this.gridList) + "   " + JSON.stringify(this.gridBck));

    for (var i = 0; i < this.gridList.length; i++) {
       toDelete = _.differenceWith(this.gridList[i].cards, this.gridBck[i].cards, _.isEqual);
       if(toDelete.length  > 0){
          break;
       }
    }

    toAdd = _.filter(this.gridList, { cards: toDelete })[0].Id;
    console.log(JSON.stringify(_.filter(this.gridBck, { cards: toDelete })));
    fromDelete = _.filter(this.gridBck, { cards: toDelete })[0].Id;
    this.tableService.updateDroppedCard(toDelete[0], fromDelete, toAdd)
      .subscribe(data => {
        console.log(data + " datata");
      });
    this.gridBck = JSON.parse(JSON.stringify(this.gridList));
  }

  createNewCard(data) {
    this.tableService.createNewCard(this.gridAccId, data)
      .subscribe(data => {
        this.gridList[this.clickedGridId].cards.push(data);
        this.gridBck = JSON.parse(JSON.stringify(this.gridList));
      });
  }

  createNewGrid(data) {
    this.tableService.createNewGrid(data)
      .subscribe(data => {
        console.log("subscribe  " + data);
        this.gridList.push(data);
        console.log("grid Data" + JSON.stringify(this.gridList));
      });;
  }

  createGridDialog() {
    let dialogRef = this.dialog.open(GridDialogComponent, {
      width: '500px',
      data: { name: "ohohoho" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + JSON.stringify(result));
      if (typeof result === 'object' && result !== null && typeof result !== 'undefined') {
        this.createNewGrid(result);
      }
    });
  }

  openDialog(Id, gridAccId) {
    this.clickedGridId = Id;
    this.gridAccId = gridAccId;
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: { name: Id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + JSON.stringify(result));
      if (typeof result === 'object' && result !== null && typeof result !== 'undefined') {
        this.createNewCard(result);
      }
    });
  }

  refreshGrid(refreshObj) {
    var griIdToDelete = _.filter(this.gridList, { cards: [refreshObj.data] })[0].Id;

    for (var i = 0; i < this.gridList.length; i++) {
      if (this.gridList[i].Id === griIdToDelete) {
        for (var j = 0; j < this.gridList[i].cards.length; j++) {
          if (this.gridList[i].cards[j].taskName === refreshObj.data.taskName) {
            const index = this.gridList[i].cards.indexOf(refreshObj.data);
            this.gridList[i].cards.splice(index,1);
            console.log("milgya" + JSON.stringify(this.gridList)+"  "+index);
            this.gridBck = JSON.parse(JSON.stringify(this.gridList));
          }
        }
      }
    }
  }

  saveSequence(){
    let dialogRef = this.dialog.open(saveSequenceDialog, {
      width: '500px',
      data: { name: "ohohoho" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was boomed' + JSON.stringify(result));
      this.saveSeq = result;
      var Ids = _.map(this.gridList, 'Id');
      this.tableService.saveSeqName(Ids , this.saveSeq)
      .subscribe(data => {
        console.log(data);
      });;
    });
  }

  getOpenList(){
    this.tableService.getOpenList().subscribe(result => {
      var myNewList : any;
      myNewList = result;
      this.openList =  Array.from(new Set(myNewList));
      console.log(" this.openList  "+ this.openList);
    });
  }

  setGridData(seqName){
      console.log("seqName"+ seqName);
      this.tableService.getSavedData(seqName).subscribe(result => {
      var myNewList : any;
      this.gridList = [];
      this.gridBck = [];
      myNewList = result;
      this.gridList =  myNewList;
      console.log(" this.openList  "+ this.gridList);
      this.gridBck = JSON.parse(JSON.stringify(this.gridList));
    });
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http'
@Injectable()
export class TableService {

    constructor(private http: HttpClient) { }

    createNewGrid(data) {
        let returnData;
        let headers = new HttpHeaders();
        headers.append("Access-Control-Allow-Origin", '*');
        headers.append("Access-Control-Allow-Methods", 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        headers.append("Access-Control-Allow-Headers", 'Origin, Content-Type, X-Auth-Token');
        headers.set('Content-Type', 'application/json');
        return this.http.post('http://localhost:8080/api/createGrid', data,
            { headers: headers }).map((response: Response) => response);
    }

    createNewCard(gridAccId, data) {
        let headers = new HttpHeaders();
        headers.append("Access-Control-Allow-Origin", '*');
        headers.append("Access-Control-Allow-Methods", 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        headers.append("Access-Control-Allow-Headers", 'Origin, Content-Type, X-Auth-Token');
        headers.set('Content-Type', 'application/json');
        let params = new HttpParams().set('gridId', gridAccId).append('data', JSON.stringify(data));

        return this.http.post('http://localhost:8080/api/createList', params,
            { headers: headers }).map((response: Response) => response);
    }

    deleteCard(taskData) {
        let headers = new HttpHeaders();
        headers.append("Access-Control-Allow-Origin", '*');
        headers.append("Access-Control-Allow-Methods", 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        headers.append("Access-Control-Allow-Headers", 'Origin, Content-Type, X-Auth-Token');
        headers.set('Content-Type', 'application/json');

        return this.http.post('http://localhost:8080/api/deleteCard', taskData,
            { headers: headers }).map((response: Response) => response);
    }

    updateDroppedCard(card, delGrid, updGrid) {
        let headers = new HttpHeaders();
        headers.append("Access-Control-Allow-Origin", '*');
        headers.append("Access-Control-Allow-Methods", 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        headers.append("Access-Control-Allow-Headers", 'Origin, Content-Type, X-Auth-Token');
        headers.set('Content-Type', 'application/json');
        let params = new HttpParams().set('card', JSON.stringify(card))
            .append('delGrid', delGrid).append('updGrid', updGrid);

        return this.http.post('http://localhost:8080/api/dropCard', params,
            { headers: headers }).map((response: Response) => response);
    }

    saveSeqName(gridIds, seqName) {
        let headers = new HttpHeaders();
        headers.append("Access-Control-Allow-Origin", '*');
        headers.append("Access-Control-Allow-Methods", 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        headers.append("Access-Control-Allow-Headers", 'Origin, Content-Type, X-Auth-Token');
        headers.set('Content-Type', 'application/json');
        let params = new HttpParams().set('gridIds', gridIds)
            .append('seqName', seqName);

        return this.http.post('http://localhost:8080/api/saveSeqName', params,
            { headers: headers }).map((response: Response) => response);
    }

     getOpenList() {
        let headers = new HttpHeaders();
        headers.append("Access-Control-Allow-Origin", '*');
        headers.append("Access-Control-Allow-Methods", 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        headers.append("Access-Control-Allow-Headers", 'Origin, Content-Type, X-Auth-Token');
        headers.set('Content-Type', 'application/json');
       

        return this.http.get('http://localhost:8080/api/openList', 
            { headers: headers }).map((response: Response) => response);
    }

    getSavedData(seqName){
        let headers = new HttpHeaders();
        headers.append("Access-Control-Allow-Origin", '*');
        headers.append("Access-Control-Allow-Methods", 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        headers.append("Access-Control-Allow-Headers", 'Origin, Content-Type, X-Auth-Token');
        headers.set('Content-Type', 'application/json');
        let params = new HttpParams().set('seqName', seqName)

      return this.http.post('http://localhost:8080/api/getSavedData', params,
            { headers: headers }).map((response: Response) => response);
    }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PurchaseRecord } from '../models/PurchaseRecordDto';
import { Summery } from '../models/summeryDto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http : HttpClient) { }

  postPurchaseRecords(data : PurchaseRecord){
    return this.http.post<PurchaseRecord>('http://localhost:3000/purchaseList/' , data);
  }

  getPurchaseRecords(){
    return this.http.get<PurchaseRecord[]>('http://localhost:3000/purchaseList/');
  }

  getSummeryRecords(){
    return this.http.get<Summery[]>('http://localhost:3000/summery/');
  }
  updateSummery(data : Summery , id : any){
    return this.http.put<Summery>('http://localhost:3000/summery/'+ id, data);
  }
}

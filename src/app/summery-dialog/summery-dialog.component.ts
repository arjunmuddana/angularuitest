import { Component, OnInit } from '@angular/core';
import { Summery } from '../models/summeryDto';
import { ApiService } from '../services/api.service';

export interface PeriodicElement {
  name: string;
  Id: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-summery-dialog',
  templateUrl: './summery-dialog.component.html',
  styleUrls: ['./summery-dialog.component.css']
})
export class SummeryDialogComponent implements OnInit {


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getData()
  }

  displayedColumns: string[] = ['Id','Customer', 'Month1', 'Month2', 'Month3' , "Totalpoints" ];
  dataSource: Summery[] = [];

  getData(){
    this.api.getSummeryRecords().subscribe({
      next : (res) =>{
        this.dataSource = res;
        console.log(res , '0011')
      }
    })
  }

}

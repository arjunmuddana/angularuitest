import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReplaySubject, Observable } from 'rxjs';
import { PurchaseRecord } from '../models/PurchaseRecordDto';
import { Summery } from '../models/summeryDto';
import { ApiService } from '../services/api.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: number;
}
interface Customer {
  value: string;
}

interface Month {
  value: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'customer1', weight: 1, symbol: 120 },
];

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css'],
})
export class GridViewComponent implements OnInit {
  Customers: Customer[] = [
    { value: 'Customer1' },
    { value: 'Customer2' },
    { value: 'Customer3' },
    { value: 'Customer4' },
    { value: 'Customer5' },
  ];

  Months: Month[] = [{ value: 1 }, { value: 2 }, { value: 3 }];

  displayedColumns: string[] = ['Customer', 'Month', 'Price', 'RewardPoints'];
  dataSource: PurchaseRecord[] = [];

  purchaseForm!: FormGroup;

  summery: Summery[] = [];

  summerydata!: Summery;
  PurchaseRecordData!: PurchaseRecord;

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.purchaseForm = this.formBuilder.group({
      name: [''],
      month: [''],
      price: [''],
      rewardPoints: [0],
    });
    this.getData();
  }

  addData() {
    let temp1 = this.purchaseForm.get('price')?.value;
    let points = 0;
    if (temp1 > 50) {
      if (temp1 > 100) {
        points = 50;
        points = points + (temp1 - 100) * 2;
      } else {
        points = points + (temp1 - 50);
      }
    }
    this.purchaseForm.get('rewardPoints')?.setValue(points);
    this.PurchaseRecordData = this.purchaseForm.value;
    this.PurchaseRecordData.rewardPoints = points;
    this.api.postPurchaseRecords(this.purchaseForm.value).subscribe({
      next: (res) => {
        this.getData();
        this.purchaseForm.reset();
        this.openSnackBar('Record added Succesfully');
      },
    });
    this.addSummery();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'done', {
      duration: 3000,
    });
  }

  getData() {
    this.api.getPurchaseRecords().subscribe({
      next: (res) => {
        this.dataSource = res;
      },
    });
  }

  addSummery() {
    if (
      this.purchaseForm.get('name')?.value != null &&
      this.purchaseForm.get('price')?.value != null &&
      this.purchaseForm.get('month')?.value != null
    ) {
      this.api.getSummeryRecords().subscribe({
        next: (data) => {
          this.summery = data;
          for (let i = 0; i < this.summery.length; i++) {
            const e = this.summery[i];
            if (e.customer == this.PurchaseRecordData.name) {
              this.summerydata = e;
              if (this.PurchaseRecordData.month == 1) {
                this.summerydata.month1 = this.PurchaseRecordData.rewardPoints;
                this.summerydata.totalpoints =
                  this.summerydata.totalpoints +
                  this.PurchaseRecordData.rewardPoints;
              } else if (this.PurchaseRecordData.month == 2) {
                this.summerydata.month2 = this.PurchaseRecordData.rewardPoints;
                this.summerydata.totalpoints =
                  this.summerydata.totalpoints +
                  this.PurchaseRecordData.rewardPoints;
              } else {
                this.summerydata.month3 = this.PurchaseRecordData.rewardPoints;
                this.summerydata.totalpoints =
                  this.summerydata.totalpoints +
                  this.PurchaseRecordData.rewardPoints;
              }
              let id = i;
              this.api.updateSummery(this.summerydata, id).subscribe({
                next: (res) => {
                  console.log(res, '0022');
                },
              });

              break;
            }
          }
        },
      });
    }
  }
}

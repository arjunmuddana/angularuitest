import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SummeryDialogComponent } from './summery-dialog/summery-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    
  }
  title = 'angular_ui';

  constructor(public dialog: MatDialog) {}

  viewSummery() {
    const dialogRef = this.dialog.open(SummeryDialogComponent , {
      width : '60%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

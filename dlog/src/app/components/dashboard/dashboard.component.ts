import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LogService } from '../../services/log.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  logs = [];
  logsByCategory = [];

  startDate : string;
  endDate : string;

  dataSource = new MatTableDataSource();
  displayedColumns : string[] = ["date", "description", "category", "project_name"];
  @ViewChild(MatPaginator) paginator : MatPaginator;
  
  @ViewChild('addLogDialog') addLogDialog: TemplateRef<any>;

  constructor(private logService : LogService, private router : Router, private dialog: MatDialog) {}

   searchByDate() {
    this.startDate = formatDate(this.startDate, "MM-dd-yyyy", "en-us");
    this.endDate = formatDate(this.endDate, "MM-dd-yyyy", "en-us");
    this.router.navigate(['/logs-by-date/', this.startDate, this.endDate])
   }

  ngOnInit(): void {
    this.logService.getLogs().subscribe(value => {
      value.forEach(log => {
        log.Date = formatDate(log.Date, "MMMM dd, yyyy", "en-us");
        if (log.Status != "PENDING") {
          this.logs.push(log);
        }
      })

      this.logs.sort((currentLog, nextLog) => (currentLog.Id > nextLog.Id ? -1 : 1));
      console.log(this.logs);
      this.dataSource.data = this.logs;
      this.dataSource.paginator = this.paginator;
    })


    this.logService.getLogCategories().subscribe(value => {
      value.forEach(log => {
        this.logsByCategory.push(log)
      }
      )
    })
  }

  showLogDialog() {
    let logDialog = this.dialog.open(this.addLogDialog, {
      width: '40%'
    });
  }
}

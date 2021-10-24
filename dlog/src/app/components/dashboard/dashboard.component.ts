import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LogService } from '../../services/log.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

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
  displayedColumns : string[] = ["date", "description", "category"];
  @ViewChild(MatPaginator) paginator : MatPaginator;
  
  constructor(private logService : LogService, private router : Router) {}

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

}

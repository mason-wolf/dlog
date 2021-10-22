import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LogService } from '../services/log.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  logs = [];
  dataSource = new MatTableDataSource();
  displayedColumns : string[] = ["date", "description"];
  @ViewChild(MatPaginator) paginator : MatPaginator;
  
  constructor(private logService : LogService) {

    this.logService.getLogs().subscribe(value => {
      value.forEach(log => {
       // console.log(log)
      //  log.Date = formatDate(log.Date, "MMMM dd, yyyy", "en-us");
        this.logs.push(log);
      })

      this.logs.sort((currentLog, nextLog) => (currentLog.Id > nextLog.Id ? -1 : 1));
      this.dataSource.data = this.logs;
      this.dataSource.paginator = this.paginator;
    })

   }

  ngOnInit(): void {
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-logs-by-date',
  templateUrl: './logs-by-date.component.html',
  styleUrls: ['./logs-by-date.component.css']
})
export class LogsByDateComponent implements OnInit {

  logs : any[] = [];
  dataSource = new MatTableDataSource();
  displayedColumns : string[] = ["date", "description"];
  @ViewChild(MatPaginator) paginator : MatPaginator;
  
  constructor(private router : ActivatedRoute, private logService : LogService) { 
    let startDate = this.router.snapshot.paramMap.get('startDate');
    let endDate = this.router.snapshot.paramMap.get('endDate')

    this.logService.getLogsByDate(startDate, endDate).subscribe(resp =>{
      Object.keys(resp).forEach(log => {
        this.logs.push(resp[log])
      })

      this.dataSource.data = this.logs;
      this.dataSource.paginator = this.paginator;
    })
  }

  ngOnInit(): void {
  }

}

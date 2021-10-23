import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { LogService } from '../services/log.service';
import { map, switchMap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-search-logs',
  templateUrl: './search-logs.component.html',
  styleUrls: ['./search-logs.component.css']
})

export class SearchLogsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator : MatPaginator;
  logs : any[] = [];
  searchTerm : string;
  dataSource = new MatTableDataSource();
  displayedColumns : string[] = ["date", "description"];
  
  constructor(private route : ActivatedRoute, private logService : LogService, private router : Router) {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    let searchTerm = this.route.snapshot.paramMap.get('searchTerm');

    this.logService.searchLogs(searchTerm).subscribe(resp => {
      Object.keys(resp).forEach(log => {
        this.logs.push(resp[log])
      })

      this.dataSource.data = this.logs;
      this.dataSource.paginator = this.paginator;
      this.searchTerm = searchTerm;
    })

  }

  ngOnInit(): void {
  }

}



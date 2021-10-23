import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { LogService } from '../../services/log.service';
import { map, switchMap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-logs-by-category',
  templateUrl: './logs-by-category.component.html',
  styleUrls: ['./logs-by-category.component.css']
})

export class LogsByCategoryComponent implements OnInit {

  @ViewChild(MatPaginator) paginator : MatPaginator;
  logs : any[] = [];
  category : string;
  dataSource = new MatTableDataSource();
  displayedColumns : string[] = ["date", "description"];
  
  constructor(private route : ActivatedRoute, private logService : LogService, private router : Router) {

    let category = this.route.snapshot.paramMap.get('category');

    this.logService.getLogsByCategory(category).subscribe(resp => {
      Object.keys(resp).forEach(log => {
        this.logs.push(resp[log])
      })

      this.dataSource.data = this.logs;
      this.dataSource.paginator = this.paginator;
      this.category = category;
    })
  }

  ngOnInit(): void {
  }

}



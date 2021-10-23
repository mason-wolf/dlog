import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchTerm : string;

  constructor(private router : Router) { }

  search() {
    this.router.navigate(['/search-logs/', this.searchTerm])
  }

  ngOnInit(): void {
  }

}

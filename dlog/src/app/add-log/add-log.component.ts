import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-add-log',
  templateUrl: './add-log.component.html',
  styleUrls: ['./add-log.component.css']
})
export class AddLogComponent implements OnInit {

  log = {
    "title" : "",
    "category" : "",
    "description" : "",
    "date" : ""
  }

  constructor(private logService : LogService, private router : Router) { }

  ngOnInit(): void {
  }

  addLog() {
    let logObj = {}
    logObj["Description"]= this.log["title"]
    logObj["Category"] = this.log["category"]
    logObj["Contents"] = this.log["description"]
    logObj["Date"] = this.log["date"]

    if(logObj["Date"] == "") {
      logObj["Date"] = formatDate(new Date(), "MM-dd-yyyy", "en-us");
    }
    else {
      logObj["Date"] =  formatDate(logObj["Date"], "MM-dd-yyyy", "en-us");
    }
    this.logService.addLog(logObj)
    this.router.navigate([''])
  }
}

import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogService } from '../../services/log.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common'
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-view-log',
  templateUrl: './view-log.component.html',
  styleUrls: ['./view-log.component.css']
})
export class ViewLogComponent implements OnInit {

  logId : number;
  editMode = false;
  innerHTML : any;
  projects : string[] = [];

  log = {}

  constructor(private route : ActivatedRoute, private logService : LogService, private sanitizer : DomSanitizer, private router : Router,
    private location : Location, private projectService : ProjectService) { 
    const id = this.route.snapshot.paramMap.get('logId');

    if (id != null) {
      this.logId = parseInt(id);

      this.logService.getLogById(this.logId).subscribe(value => {
        this.log = value[0];
        this.log["Date"] = formatDate(this.log["Date"], "MMMM dd, yyyy", "en-us");
        this.innerHTML = this.sanitizer.bypassSecurityTrustHtml(this.log["Contents"]);
      })

      this.projectService.getProjects().subscribe(value =>{
        value.forEach(value => {
          this.projects.push(value);
        })
      })

    }
  }

  toggleEdit() {
    if (this.editMode == false) {
      this.editMode = true;
      this.log["Date"] = formatDate(this.log["Date"], "yyyy-MM-dd", "en-us");
    }
    else {
      this.editMode = false;
      this.log["Date"] = formatDate(this.log["Date"], "MMMM dd, yyyy", "en-us");
    }
  }

  updateLog() {
    this.log["Date"] = formatDate(this.log["Date"], "MM-dd-yyyy", "en-us");
    this.log["Status"] = "COMPLETED";
    console.log(this.log)
    this.logService.updateLog(this.log).subscribe(value => {
      console.log(value)
    })
    this.toggleEdit();
  }

  deleteLog() {
    this.logService.deleteLog(this.log["Id"]).subscribe(value => {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      }
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/']);
    });
  }
  
  ngOnInit(): void {
  }

  back() {
    this.location.back();
  }
}

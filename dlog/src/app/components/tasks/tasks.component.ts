import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/models/log.model';
import { LogService } from 'src/app/services/log.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {

  projects : any[] = [];

  projectName : string;
  project : any;
  logs : Log[] = [];

  newTask = {
    "Description" : "",
    "Category" : ""
  }

  constructor(private projectService : ProjectService, private logService : LogService) { 
    this.projectService.getProjects().subscribe(value =>{
      Object.keys(value).forEach(project => {
        this.projects.push(value[project])
      });
    })
  }

  addProject() {
    if (this.projectName != null) {
      this.projectService.addProject(this.projectName).subscribe(value => {
        console.log(value)
      })
    }
  }

  showProject(project) {
    this.logs = [];
    this.project = project;
    this.logService.getLogsByProjectId(this.project.ID).subscribe(value => {
      Object.keys(value).forEach(log => {
        this.logs.push(value[log])
      });
    })
  }

  addTask() {
    if (this.newTask.Description != "" && this.newTask.Category != "") {
      let task = new Log();
      task.Category = this.newTask.Category;
      task.Description = this.newTask.Description;
      task.Project_ID = this.project.ID;
      task.Status = "PENDING";
      task.Date = formatDate(new Date(), "MM-dd-yyyy", "en-us");
      task.Contents = null;
      this.newTask.Category = "";
      this.newTask.Description = "";
      this.logService.addLog(task);
      this.showProject(this.project);
    }
  }

  ngOnInit(): void {
  }

}


// export class Log {
//   Id : number;
//   OwnerId: number;
//   Date : string;
//   Description: string;
//   Category : string;
//   Contents : string;
//   TimeSpent : number;
//   Priority : number;
//   Status : string;
//   Project_ID : number;
// }

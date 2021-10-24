import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
  completedTasks : Log[] = [];
  tasksCompleted = 0;
  tasksToDo = 0;

  dataSource = new MatTableDataSource();
  displayedColumns : string[] = ["date", "description"];
  @ViewChild(MatPaginator) paginator : MatPaginator;
  
  newTask = {
    "Description" : "",
    "Category" : ""
  }

  constructor(private projectService : ProjectService, private logService : LogService) {   }

  getProjects() {
    this.projects = [];
    this.projectService.getProjects().subscribe(value =>{
      Object.keys(value).forEach(project => {
        this.projects.push(value[project])
      });
    })
  }

  addProject() {
    if (this.projectName != null) {
      this.projectService.addProject(this.projectName).subscribe(value => {
        this.getProjects();
        this.projectName = "";
      })
    }
  }

  showProject(project) {
    this.logs = [];
    this.project = project;
    this.tasksCompleted = 0;
    this.tasksToDo = 0;
    this.logService.getLogsByProjectId(this.project.ID).subscribe(value => {
      this.completedTasks = [];
      Object.keys(value).forEach(log => {
        if (value[log].Status != "COMPLETED") {
          this.logs.push(value[log])
          this.tasksToDo++;
        }
        else {
          this.tasksCompleted++;
          this.completedTasks.push(value[log])
        }
      });

      this.dataSource.data = this.completedTasks;
      this.dataSource.paginator = this.paginator;
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
      this.logService.addLog(task).subscribe(value =>{
        this.showProject(this.project);
      });
    }
  }

  deleteTask(task) {
    this.logService.deleteLog(task.Id).subscribe(value => {
      this.showProject(this.project);
    })
  }
  
  deleteProject() {
    console.log(this.project)
    this.projectService.deleteProject(this.project.ID).subscribe(value => {
      this.getProjects();
      this.project = null;
    })
  }

  markAsDone(task) {
    task.Status = "COMPLETED";
    this.logService.updateLog(task).subscribe(value => {
      this.showProject(this.project)
    });
  }

  markToDo(task) {
    task.Status = "PENDING";
    this.logService.updateLog(task).subscribe(value => {
      this.showProject(this.project)
    });
  }

  ngOnInit(): void {
    this.getProjects();
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

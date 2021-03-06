import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient : HttpClient) { }

  serverURL = "http://localhost:80/"

  getProjects() : Observable<any> {
    return this.httpClient.get(this.serverURL + "getProjects");
  }

  addProject(projectName) {
    return this.httpClient.post(this.serverURL + "addProject", JSON.stringify(projectName))
  }

  deleteProject(projectId) {
    return this.httpClient.post(this.serverURL + "deleteProject", JSON.stringify(projectId))
  }
  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private httpClient : HttpClient) { }

  serverURL = "http://localhost:5000/"

  getLogs() : Observable<any> {
    return this.httpClient.get(this.serverURL + "getLogs");
  }

  getLogCategories() : Observable<any> {
    return this.httpClient.get(this.serverURL + "getLogCategories");
  }

  getLogsByCategory(category) : Observable<any> {
    return this.httpClient.post(this.serverURL + "getLogsByCategory", JSON.stringify(category))
  }

  getLogsByDate(startDate, endDate) {
    return this.httpClient.post(this.serverURL + "getLogsByDate", { startDate : startDate, endDate : endDate})
  }
  
  getLogsByProjectId(projectId) : Observable<any> {
    return this.httpClient.post(this.serverURL + "getLogsByProjectId", JSON.stringify(projectId))
  }

  addLog(log : any) {
    return this.httpClient.post(this.serverURL + "addLog",  JSON.stringify(log)).subscribe(value => {
      console.log(value);
    });
  }

  getLogById(logId) : Observable<any> {
    return this.httpClient.post(this.serverURL + "getLogById", logId);
  }

  updateLog(log : any) {
    return this.httpClient.post(this.serverURL + "updateLog", JSON.stringify(log)).subscribe(value => {
      console.log(value);
    })
  }

  deleteLog(logId) {
    return this.httpClient.post(this.serverURL + "deleteLog", logId).subscribe(value => {
      console.log(value)
    });
  }

  searchLogs(searchTerm) {
    return this.httpClient.post(this.serverURL + "searchLogs", JSON.stringify(searchTerm));
  }
}

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

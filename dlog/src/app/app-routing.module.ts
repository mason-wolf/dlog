import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddLogComponent } from './add-log/add-log.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchLogsComponent } from './search-logs/search-logs.component';
import { ViewLogComponent } from './view-log/view-log.component';

const routes: Routes = [
  { path: '', component : DashboardComponent},
  { path: 'add-log', component : AddLogComponent},
  { path: 'view-log/:logId', component: ViewLogComponent },
  { path: 'search-logs/:searchTerm', component : SearchLogsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

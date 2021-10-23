import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddLogComponent } from './components/add-log/add-log.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogsByCategoryComponent } from './components/logs-by-category/logs-by-category.component';
import { LogsByDateComponent } from './components/logs-by-date/logs-by-date.component';
import { SearchLogsComponent } from './components/search-logs/search-logs.component';
import { ViewLogComponent } from './components/view-log/view-log.component';

const routes: Routes = [
  { path: '', component : DashboardComponent},
  { path: 'add-log', component : AddLogComponent},
  { path: 'view-log/:logId', component: ViewLogComponent },
  { path: 'search-logs/:searchTerm', component : SearchLogsComponent},
  { path: 'logs-by-category/:category', component : LogsByCategoryComponent},
  { path: 'logs-by-date/:startDate/:endDate', component : LogsByDateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

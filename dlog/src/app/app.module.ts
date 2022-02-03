import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddLogComponent } from './components/add-log/add-log.component';
import { HeaderComponent } from './components/header/header.component';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ViewLogComponent } from './components/view-log/view-log.component';
import {MatIconModule} from '@angular/material/icon';
import { SearchLogsComponent } from './components/search-logs/search-logs.component';
import { LogsByCategoryComponent } from './components/logs-by-category/logs-by-category.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { LogsByDateComponent } from './components/logs-by-date/logs-by-date.component';
import { TasksComponent } from './components/tasks/tasks.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddLogComponent,
    HeaderComponent,
    ViewLogComponent,
    SearchLogsComponent,
    LogsByCategoryComponent,
    LogsByDateComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    NgbModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule ,
    MatMenuModule,
    MatExpansionModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

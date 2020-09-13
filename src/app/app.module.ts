import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountsComponent } from './features/accounts/accounts.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './features/home/home.component';
import { AccountDetailComponent } from './features/accounts/account-detail/account-detail.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';
import { TableComponent } from './common/components/table/table.component';



const config: SocketIoConfig = { url: 'http://localhost:3000', options: {}};

@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent,
    HomeComponent,
    AccountDetailComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    MatTableModule,
    SocketIoModule.forRoot(config),
    FlexLayoutModule,
    ChartsModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

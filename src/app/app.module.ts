import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider';

// import { MatMenuModule } from '@angular/material/menu';

// import { DashboardModule } from './modules/dashboard/dashboard.module';
// import { QaDatasetModule } from './modules/qa-dataset/qa-dataset.module';
import { IdapAdminModule } from './modules/idap-admin/idap-admin.module';
// import { LanguageComponent } from './qa-dataset/components/language/language.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    // LanguageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    BrowserAnimationsModule,

    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,

    // MatMenuModule,

    // DashboardModule,
    // QaDatasetModule,

    IdapAdminModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

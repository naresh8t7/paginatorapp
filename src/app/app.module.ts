import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomtableComponent } from './customtable/customtable.component';
import { ApiService } from './api.service';
import { DataService } from './data.service';
import {HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PagerComponent } from './pager/pager.component';
import { PaginationTableComponent } from './pagination-table/pagination-table.component';
import {FormsModule} from '@angular/forms';
import { InfiniteScrollDirective } from './infinite-scroll.directive';
import { InfiniteScrollTableComponent } from './infinite-scroll-table/infinite-scroll-table.component';
import { SelectAllCheckboxComponent } from './select-all-checkbox/select-all-checkbox.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomtableComponent,
    PagerComponent,
    PaginationTableComponent,
    InfiniteScrollDirective,
    InfiniteScrollTableComponent,
    SelectAllCheckboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    DataService,
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

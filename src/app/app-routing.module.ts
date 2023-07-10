import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginationTableComponent } from './pagination-table/pagination-table.component';
import {InfiniteScrollTableComponent} from './infinite-scroll-table/infinite-scroll-table.component';


const routes: Routes = [
  { path: '', component: PaginationTableComponent, data: { name: 'Route1' } },
  { path: 'infinite', component: InfiniteScrollTableComponent, data: { name: 'Route2' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

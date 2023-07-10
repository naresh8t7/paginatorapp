import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CustomTableOptions, CustomTableColumnDefinition } from './../customtable/customtable.component';
import SampleData from '../../assets/sample_data.json';
import {BehaviorSubject, Observable} from 'rxjs';
import { of } from 'rxjs';
import 'rxjs/add/operator/do';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../data.service';

@Component({
  templateUrl: './infinite-scroll-table.component.html',
  styleUrls: ['./infinite-scroll-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfiniteScrollTableComponent implements OnInit {


  public tableOptions: CustomTableOptions;
  public records: Array<any> = SampleData;
  public pagedData: Array<any> = [];

  private tableSubject: BehaviorSubject<Array<any>> = new BehaviorSubject([]);

  scrollCallback;

  constructor(private  http: HttpClient, private changeRef: ChangeDetectorRef, private dataSvc: DataService) {
    this.scrollCallback = this.getData.bind(this);
  }

  getData() {
    return this.pageChange(null).do(this.pushChange);
  }

  initTableOptions() {
    if (this.records.length === 0) {
      console.log('No records found');
      return;
    }
    const columns: Array<CustomTableColumnDefinition> = Object.getOwnPropertyNames(this.records[0]).map((p) => {
      const colDef = {
        name: p,
        value: p,
        binding: p,
        style: {},
        isWatched: true,
      };
      return colDef;
    });

    this.tableOptions = {
      records: this.tableSubject,
      columns,
      config: {
        pageSize: 10,
        pageNumber: 1,
        totalCount: 0,
        totalPages: 0,
        maxSize: 10,
        clientPaging: false,
        showSelectCheckbox: true,
        showSelectAll: true,
      },
    };
  }

  pageChange($event: any) {
    this.pagedData = this.pagedData.concat(this.dataSvc.pageData(this.records, this.tableOptions));
    return of(this.pagedData);
  }

  pushChange = (pagedData) => {
    this.tableSubject.next(pagedData);
  }

  ngOnInit() {
    this.initTableOptions();
  }

}

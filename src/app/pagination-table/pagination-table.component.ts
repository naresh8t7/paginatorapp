import { Component, ChangeDetectorRef, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { CustomTableOptions, CustomTableColumnDefinition } from './../customtable/customtable.component';
import SampleData from '../../assets/sample_data.json';
import { DataService } from './../data.service';


@Component({
  templateUrl: './pagination-table.component.html',
  styleUrls: ['./pagination-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationTableComponent implements OnInit {
  public tableOptions: CustomTableOptions;
  public records: Array<any> = SampleData;
  public pagedData: Array<any> = [];

  private tableSubject: BehaviorSubject<Array<any>> = new BehaviorSubject([]);


  constructor(private  http: HttpClient, private changeRef: ChangeDetectorRef, private dataSvc: DataService) {
}

  pageChange($event: any) {
    if (this.tableOptions.config.clientPaging) {
      this.pagedData = this.dataSvc.pageData(this.records, this.tableOptions);
      this.pushChange();
    }
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
        clientPaging: true,
        showSelectCheckbox: true,
        showSelectAll: true,
      },
    };

    this.pageChange(null);
  }

  pushChange() {
    this.tableSubject.next(this.pagedData);
  }

  ngOnInit() {
    this.initTableOptions();
  }

}

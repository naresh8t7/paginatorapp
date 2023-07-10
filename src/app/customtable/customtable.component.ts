import {Component, Input, ChangeDetectorRef, ChangeDetectionStrategy, OnInit, OnDestroy, Optional} from '@angular/core';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {CustomTableEmitter} from './customtable.emitter';

// Column definitions for the custom table.
export class CustomTableColumnDefinition {
  public name: string = '';
  public value: string = '';
  public binding: string = '';
  public isWatched?: boolean = true;
  public style?: any;
  public isCheckbox?: boolean = false;
  public isSelected?: boolean = true;
}

// Configuration for the custom table.
export class CustomTableConfig {
  public pageSize: number = 100;
  public pageNumber?: number = 1;
  public totalCount?: number = 0;
  public totalPages?: number = 0;
  public lowerRange?: number = 0;
  public upperRange?: number = 0;
  public maxSize: number = 10;
  public clientPaging: boolean = false;
  public showSelectCheckbox: boolean = true;
  public showSelectAll: boolean = true;
}

export class CustomTableOptions {
  public records: Observable<Array<any>>;
  public columns: Array<CustomTableColumnDefinition>;
  public config: CustomTableConfig;
}

@Component({
  selector: 'app-custom-table',
  templateUrl: './customtable.component.html',
  styleUrls: ['./customtable.component.css'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CustomtableComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  public filteredData: Array<any>;

  @Input() options: CustomTableOptions;

  public filteredDataObservable: BehaviorSubject<Array<any>> = new BehaviorSubject([]);

  constructor(@Optional() private emitter: CustomTableEmitter, private changeRef: ChangeDetectorRef,
              private dataSvc: DataService, private apiSvc: ApiService) {
  }

  getCellValue(row: any, column: CustomTableColumnDefinition): string {
    return column.binding.split('.').reduce((prev: any, curr: string) => prev[curr], row);
  }

  setCellValue(row: any, column: CustomTableColumnDefinition, value: any, $event?: Event): any {
    let obj = column.binding.split('.').reduce((prev: any, curr: string) => prev[curr], row);
    console.log('Old value.. ' + obj);

    // Presume that an exclusive checkbox requires a selection ... so, if it was true before,
    // don't let it get set to false now.
    if (obj === true) {
      if (column.isCheckbox) {
        if ($event) {
          $event.preventDefault();
          $event.stopPropagation();
        }
        return false;
      }
    }

    const key = column.binding;
    if (row.hasOwnProperty(key)) {
      row[key] = value;
      obj = column.binding.split('.').reduce((prev: any, curr: string) => prev[curr], row);
      console.log('New value.. ' + obj);
    } else {
      console.log('Row doesn\'t contain property..');
    }

    if (column.isCheckbox) {
      for (const r of this.filteredData) {
        if (r !== row) {
          r[key] = false;
        }
      }

      if (this.emitter) {
        this.emitter.next({ name: 'cellClicked', data: { row, column, value } });
      }
    }
  }
  submitStatus(id: string, status: string) {
    this.apiSvc.post('api/submit', {id, status}).subscribe();
  }

  ngOnInit() {
    this.subscription = this.options.records.subscribe(res => {
      this.filteredData = res;
      this.filteredDataObservable.next(res);
      this.changeRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

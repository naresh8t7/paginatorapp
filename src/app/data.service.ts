import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CustomTableOptions, CustomTableConfig, CustomTableColumnDefinition } from './customtable/customtable.component';


@Injectable()
export class DataService {
  constructor() {
  }

  public pageData(records: Array<any>, options: CustomTableOptions): Array<any> {
    if (records) {
      const arrLength = options.config.totalCount = records.length;
      // tslint:disable-next-line:radix
      options.config.totalPages = parseInt(Math.ceil(options.config.totalCount / options.config.pageSize).toString());
      if (options.config.pageNumber > options.config.totalPages) {
        options.config.pageNumber = 1;
      }
      const startIndex: number = (options.config.pageNumber - 1) * options.config.pageSize;
      let endIndex: number = (options.config.pageNumber - 1) * options.config.pageSize + options.config.pageSize;
      endIndex = endIndex > arrLength ? arrLength : endIndex;
      options.config.lowerRange = ((options.config.pageNumber - 1) * options.config.pageSize) + 1;
      if (!options.config.clientPaging) {
        options.config.upperRange = options.config.lowerRange + arrLength - 1;
      } else {
        options.config.upperRange = options.config.lowerRange + options.config.pageSize - 1;
        if (options.config.upperRange > records.length) {
          options.config.upperRange = records.length;
        }
      }
      const arr = records.slice(startIndex, endIndex);
      console.log('Number of records returned:' + arr.length);
      return arr;
    } else {
      options.config.lowerRange = 0;
      options.config.upperRange = 0;
      options.config.totalPages = 0;
      options.config.totalCount = 0;
    }

    return [];
  }
}

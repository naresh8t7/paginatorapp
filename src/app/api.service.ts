import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {
  }

  post(url: string, body: any, search?: any): Observable<any> {
    console.log('In API Service.. making post call.');
    const headers: HttpHeaders = new HttpHeaders();

    // Allow passing in HttpParams
    let httpParams = new HttpParams();
    for (const key in search) {
      if (typeof (search[key]) !== 'undefined') {
        httpParams = httpParams.append(key, search[key]);
      }
    }

    return this.http
      .post(url, body, { params: httpParams })
      .pipe(map((res: Response) => {
        console.log('Request complete');
        return res;
      }));
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {
  // very basic data access service

  baseUrl = 'http://localhost:3000/' // would be some config to eval this

  constructor(private http: HttpClient) { }

  public get<T>(url: string): Observable<T> {
    const target = this.baseUrl + url;
    //would be some error handling, logging etc 
    return this.http.get<T>(target);
  }

}

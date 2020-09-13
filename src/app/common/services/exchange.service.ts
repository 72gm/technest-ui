import { Injectable, OnInit } from '@angular/core';
import { DataAccessService } from 'src/app/core/data-access.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  constructor(private dataAccess: DataAccessService) { }

  getExchangeRate(): Observable<number> {
    return this.dataAccess.get<number>('exchange/rate') // wouldn't hard code this uri
  }
}
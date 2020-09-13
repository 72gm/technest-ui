import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataAccessService } from 'src/app/core/data-access.service';
import { IAccount } from '../models/account';
import { ITransaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private dataAccess: DataAccessService) { }

  getAccountList(): Observable<IAccount[]> {
    return this.dataAccess.get<IAccount[]>('accounts') // wouldn't hard code this uri
  }

  getById(id: string): Observable<ITransaction[]> {
    return this.dataAccess.get<ITransaction[]>('accounts/' + id) // wouldn't hard code this uri
  }
}

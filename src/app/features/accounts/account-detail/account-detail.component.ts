import { Component, OnInit, OnDestroy } from '@angular/core';
import { ITransaction } from 'src/app/common/models/transaction';
import { AccountService } from 'src/app/common/services/account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['OrderId', 'OrderCode'];
  dataSource: ITransaction[];
  sub: Subscription;

  constructor(
    private accountsService: AccountService,
    private activatedRoute: ActivatedRoute) { }

  ngOnDestroy(): void {
    if (this.sub)
      this.sub.unsubscribe()
  }

  ngOnInit(): void {

    this.sub = this.activatedRoute.params.subscribe(params => {
     this.getDetail(params['id']); 
    });


  }

  getDetail(id: string) {
    this.accountsService.getById(id).subscribe(
      (response: ITransaction[]) => {
        console.log(response);
        this.dataSource = response;
      },
      (error: HttpErrorResponse) => {
        console.log('there has been an error: ' + error.message)
      }
    )
  }
}

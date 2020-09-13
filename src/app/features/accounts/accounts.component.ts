import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from 'src/app/common/services/account.service';
import { IAccount } from 'src/app/common/models/account';
import { HttpErrorResponse } from '@angular/common/http';
import { ITransaction } from 'src/app/common/models/transaction';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/common/services/socket.service';
import { IBitcoin } from 'src/app/common/models/bitcoin';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['AccountName', 'Category', 'Tag', 'Balance', 'AvailableBalance'];
  dataSource: IAccount[];
  bitPrice: number;
  oldBitPrice: number;
  alertColour: string;
  sub: Subscription

  constructor(
    private accountsService: AccountService,
    private socketService: SocketService,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    if (this.sub)
      this.sub.unsubscribe();
  }

  ngOnInit(): void {

    this.accountsService.getAccountList()
      .subscribe(
        (response: IAccount[]) => {
          console.log(response);
          this.dataSource = response;
        },
        (error: HttpErrorResponse) => {
          console.log('there has been an error: ' + error.message)
        }
      )

    this.sub = this.socketService.bitCoinChanged$.subscribe(
      (bitCoin: IBitcoin) => {
        if (bitCoin) {
          this.oldBitPrice = this.bitPrice;
          this.bitPrice = bitCoin.price;
        }
      },
      (error: HttpErrorResponse) => {
        console.log('there has been an error: ' + error.message)
      }
    )
  }

  doWeHaveData() {
    return (this.dataSource && this.dataSource.length > 0)
  }

  rowClicked(element: ITransaction) {
    this.router.navigate(['/accounts', element.AccountId]);
  }

  // getDollars(bits: number) {
  //   return (bits * this.bitPrice).toFixed(2)
  // }

  // getUpOrDown() {

  //   if (this.oldBitPrice != this.bitPrice) {
  //     if (this.oldBitPrice > this.bitPrice) {
  //       this.alertColour = 'alert-colour-down'
  //       return 'arrow_downward'
  //     } else {
  //       this.alertColour = 'alert-colour-up'
  //       return 'arrow_upward'
  //     }
  //   } else {
  //     //unchanged
  //     this.alertColour = 'alert-colour-same'
  //     return ''
  //   }


  // }

}
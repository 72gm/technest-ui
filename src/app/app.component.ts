import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ExchangeService } from './common/services/exchange.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SocketService } from './common/services/socket.service';
import { IBitcoin } from './common/models/bitcoin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  rate: number;

  constructor(
    private exchangeService: ExchangeService,
    private socketService: SocketService) { }

  ngOnInit(): void {

    this.exchangeService.getExchangeRate().subscribe(
      (response: number) => {
        console.log(response);
        this.socketService.bitCoin = { price: response, time: new Date() };
        this.rate = response;
      },
      (error: HttpErrorResponse) => {
        console.log('there has been an error: ' + error.message)
      }
    )

    this.socketService.receiveMessage().subscribe(
      (bitcoinMessage: IBitcoin) => {
        console.log('exchange:', bitcoinMessage)
        this.socketService.bitCoin = bitcoinMessage;
        this.socketService.bitCoinChanged$.next(bitcoinMessage)
        this.rate = bitcoinMessage.price;
      },
      (error: HttpErrorResponse) => {
        console.log('there has been an error: ' + error.message)
      }
    );
  }

}

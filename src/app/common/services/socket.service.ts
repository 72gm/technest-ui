import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { IBitcoin } from '../models/bitcoin';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  
  private _bitCoin : IBitcoin;
  public get bitCoin() : IBitcoin {
    return this._bitCoin;
  }
  public set bitCoin(v : IBitcoin) {
    console.log('setting')
    this._bitCoin = v;
  }
  
  bitCoinChanged$ = new BehaviorSubject(this.bitCoin);

  constructor(
    private socket: Socket
  ) { }

  receiveMessage(): Observable<IBitcoin> {
    return this.socket.fromEvent('exchange');
  }

  getBitCoinPrice(): Observable<number>{
    if (this.bitCoin){
    return of(this.bitCoin.price)
    }else{
      return of(0)
    }
  }
}

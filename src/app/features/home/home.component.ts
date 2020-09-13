import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/common/services/socket.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IBitcoin } from 'src/app/common/models/bitcoin';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  chartValues: IBitcoin[] = [];
  min: Date = new Date();
  max: Date = new Date(this.min.getTime() + 10000);

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.receiveMessage().subscribe(
      (message: IBitcoin) => {
        message.time = new Date(message.time)
        this.chartValues = [...this.chartValues, message];

        if (this.chartValues.length > 8) {
          this.min = this.chartValues[this.chartValues.length - 8].time;
          this.max = message.time;
        }

        // cheap way to stop memory issue - would do a better way of course
        if (this.chartValues.length > 20000)
          this.chartValues = [];
      },
      (error: HttpErrorResponse) => {
        console.log('there has been an error: ' + error.message)
      }
    );
  }

}

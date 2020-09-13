import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ITransaction } from '../../models/transaction';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() displayedColumns: string[] = ['AccountName', 'Category', 'Tag', 'Balance', 'AvailableBalance'];
  @Input() dataSource;
  @Input() bitPrice: number;
  @Input() oldBitPrice: number;
  @Input() alertColour: string;

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  rowClicked(element: ITransaction) {
    this.router.navigate(['/accounts', element.AccountId]);
  }
  
  getDollars(bits: number) {
    return (bits * this.bitPrice).toFixed(2)
  }

  getUpOrDown(colIndex) {

    if (this.oldBitPrice != this.bitPrice) {
      if (this.oldBitPrice > this.bitPrice) {
        this.alertColour = 'alert-colour-down'
        return 'arrow_downward'
      } else {
        this.alertColour = 'alert-colour-up'
        return 'arrow_upward'
      }
    } else {
      //unchanged
      this.alertColour = 'alert-colour-same'
      return ''
    }
}

}

import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../../interfaces/OrderInterface';

@Component({
  selector: 'app-card-order-client',
  templateUrl: './card-order-client.component.html',
  styleUrls: ['./card-order-client.component.scss'],
})
export class CardOrderClientComponent implements OnInit {

  showProducts=false;

  @Input() order:Order;

  constructor() {
   }

  ngOnInit() {
    
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../interfaces/OrderInterface';

@Component({
  selector: 'app-item-order',
  templateUrl: './item-order.component.html',
  styleUrls: ['./item-order.component.scss'],
})
export class ItemOrderComponent implements OnInit {

  showProducts=false;

  @Input() order:Order;

  constructor() {
   }

  ngOnInit() {
    
  }

}

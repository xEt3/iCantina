import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../../../interfaces/OrderInterface';

@Component({
  selector: 'app-item-delivery-data',
  templateUrl: './item-delivery-data.component.html',
  styleUrls: ['./item-delivery-data.component.scss'],
})
export class ItemDeliveryDataComponent implements OnInit {

  @Input()order:Order;

  constructor() { }

  ngOnInit() {}

}

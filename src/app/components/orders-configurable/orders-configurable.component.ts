import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../interfaces/OrderInterface';

@Component({
  selector: 'app-orders-configurable',
  templateUrl: './orders-configurable.component.html',
  styleUrls: ['./orders-configurable.component.scss'],
})
export class OrdersConfigurableComponent implements OnInit {

  @Input()orders:Order[];

  constructor() { }

  ngOnInit() {}

}

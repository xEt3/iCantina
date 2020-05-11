import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../../interfaces/OrderInterface';

@Component({
  selector: 'app-grid-orders-editable',
  templateUrl: './grid-orders-editable.component.html',
  styleUrls: ['./grid-orders-editable.component.scss'],
})
export class GridOrdersEditableComponent implements OnInit {

  @Input()orders:Order[];

  constructor() { }

  ngOnInit() {}

}

import { Component, OnInit, Input } from '@angular/core';
import { Products } from '../../../interfaces/OrderInterface';

@Component({
  selector: 'app-item-products',
  templateUrl: './item-products.component.html',
  styleUrls: ['./item-products.component.scss'],
})
export class ItemProductsComponent implements OnInit {

  @Input() products:Products[];
  showProducts=false;

  constructor() { }

  ngOnInit() {}

}

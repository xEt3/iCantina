import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../interfaces/ProductInterfaces';

@Component({
  selector: 'app-product-available',
  templateUrl: './product-available.component.html',
  styleUrls: ['./product-available.component.scss'],
})
export class ProductAvailableComponent implements OnInit {

  @Input() product:Product;
  constructor() { }

  ngOnInit() {}

}

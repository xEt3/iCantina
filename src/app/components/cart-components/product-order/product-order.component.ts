import { Component, OnInit, Input } from '@angular/core';
import { ProductOrder } from '../../../../../model/productOrder';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../interfaces/ProductInterfaces';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.scss'],
})
export class ProductOrderComponent implements OnInit {
  @Input() productOrder:ProductOrder;
  constructor(private cartService:CartService) { }

  ngOnInit() {}

   deleteProductToCart(product:Product){
    this.cartService.removeProductElement(product._id);
  }

}

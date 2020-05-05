import { Component, OnInit, Input } from '@angular/core';
import { ProductOrder } from '../../../../model/productOrder';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/ProductInterfaces';

@Component({
  selector: 'app-item-product-order',
  templateUrl: './item-product-order.component.html',
  styleUrls: ['./item-product-order.component.scss'],
})
export class ItemProductOrderComponent implements OnInit {

  @Input() productOrder:ProductOrder;

  constructor(
    private cartService:CartService,
  ) { }

  ngOnInit() {}

  async deleteProductToCart(product:Product){
     this.cartService.removeProductElement(product._id);
  }


}

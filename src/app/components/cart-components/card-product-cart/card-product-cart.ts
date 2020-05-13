import { Component, OnInit, Input } from '@angular/core';
import { ProductOrder } from '../../../../../model/productOrder';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../interfaces/ProductInterfaces';

@Component({
  selector: 'app-card-product-cart',
  templateUrl: './card-product-cart.html',
  styleUrls: ['./card-product-cart.scss'],
})
export class CardProductCartComponent implements OnInit {
  @Input() productOrder:ProductOrder;
  constructor(private cartService:CartService) { }

  ngOnInit() {}

   deleteProductToCart(product:Product){
    this.cartService.removeProductElement(product._id);
  }

}

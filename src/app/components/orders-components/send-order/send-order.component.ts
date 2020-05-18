import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductOrder } from '../../../../../model/productOrder';
import { CartService } from '../../../services/cart.service';
import { UIService } from '../../../services/ui.service';
import { OrdersService } from '../../../services/orders.service';
import { OrderToSend, ProductElement } from '../../../interfaces/OrderInterface';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-send-order',
  templateUrl: './send-order.component.html',
  styleUrls: ['./send-order.component.scss'],
})
export class SendOrderComponent implements OnInit {

  constructor(
    private modalController: ModalController,
    public cartService: CartService,
    private ui: UIService,
    private ordersService: OrdersService,
    private userService: UserService
  ) { }

  async ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async sendOrder() {
    if (this.userService.isLoged) {
      const header = "Confirmar pedido"
      const message = "¿Desea confirmar el pedido?"
      let result = await this.ui.presentAlertConfirm(header, message);
      if (result === true) {
        const order = this.getOrder();
        const resp = await this.ordersService.newOrder(order);
        if (resp) {
          this.ui.presentToast("Pedido enviado");
          this.cartService.reset();
          this.dismiss();
        }
      }
    }else{
      this.userService.loginGoogle();
    }
  }

  private getOrder(): OrderToSend {
    const productsElment: ProductElement[] = this.getProductsElements();
    return { products: productsElment };
  }

  private getProductsElements(): ProductElement[] {
    const productsElement: ProductElement[] = [];
    this.cartService.cartProducts.forEach(productOrder => {
      const product = productOrder.product._id;
      const amount = productOrder.amount;
      productsElement.push({ product, amount })
    });
    return productsElement;
  }

}

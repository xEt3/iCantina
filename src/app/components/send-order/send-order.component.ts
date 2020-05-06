import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductOrder } from '../../../../model/productOrder';
import { CartService } from '../../services/cart.service';
import { UIService } from '../../services/ui.service';
import { OrdersService } from '../../services/orders.service';
import { Order, ProductElement, OrderToSend } from '../../interfaces/OrderInterface';

@Component({
  selector: 'app-send-order',
  templateUrl: './send-order.component.html',
  styleUrls: ['./send-order.component.scss'],
})
export class SendOrderComponent implements OnInit {

  productsOrder: ProductOrder[] = [];

  constructor(
    private modalController: ModalController,
    private cartService: CartService,
    private ui: UIService,
    private ordersService: OrdersService
  ) { }

  async ngOnInit() {
    this.productsOrder = await this.cartService.getAllProductOrders();
    this.cartService.cartChange.subscribe(async () => {
      this.productsOrder = await this.cartService.getAllProductOrders();
      if (this.productsOrder.length === 0) {
        this.dismiss();
      }
    })
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async sendOrder() {
    const header = "Confirmar pedido"
    const message = "¿Desea confirmar el pedido?"
    let result = await this.ui.presentAlertConfirm(header, message);
    if (result) {
      const order = this.getOrder();
      const resp = await this.ordersService.newOrder(order);
      if(resp){
        this.ui.presentToast("Pedido enviado");
        this.cartService.reset();
        this.dismiss();
      }
    } else {
      this.dismiss();
    }
  }

  private getOrder(): OrderToSend {
    const productsElment: ProductElement[] = this.getProductsElements();
    return { products: productsElment };
  }

  private getProductsElements():ProductElement[]{
    const productsElement: ProductElement[] = [];
    this.productsOrder.forEach(productOrder => {
      const product = productOrder.product._id;
      const amount = productOrder.amount;
      productsElement.push({ product, amount })
    });
    return productsElement;
  }

}

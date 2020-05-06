import { Component, OnInit } from '@angular/core';
import { Order } from '../../interfaces/OrderInterface';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {

  isFinished: boolean = true;
  infineScrollEnable = true;
  constructor(private ordersService: OrdersService) { }

  ordersFinished: Order[] = [];
  ordersUnfinished: Order[] = [];

  async ngOnInit() {
    this.nexts(null, true)
  }

  async nexts(ev?, reset: boolean = false) {
    if (reset) {
      this.ordersFinished = [];
      this.ordersUnfinished = [];
      this.infineScrollEnable = true;
    }
    const query = await this.ordersService.getMyOrders(reset)
    query.subscribe(data => {
      this.separateOrders(data.orders)
      if (data.orders.length === 0) {
        this.infineScrollEnable = false;
      }
      if (ev) {
        ev.target.complete();
      }
    })
  }

  separateOrders(orders: Order[]) {
    orders.forEach(order => {
      if (order.done) {
        this.ordersFinished.push(order);
      } else {
        this.ordersUnfinished.push(order);
      }
    })
  }

}

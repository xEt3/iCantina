import { Component, OnInit } from '@angular/core';
import { OrdersManagementService } from '../../services/orders-management.service';
import { Order } from '../../interfaces/OrderInterface';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.page.html',
  styleUrls: ['./order-management.page.scss'],
})
export class OrderManagementPage implements OnInit {

  page = 'todo';
  ordersHistory: Order[] = [];
  ordersReady: Order[] = [];
  ordersToDo: Order[] = [];
  infineScrollEnable = true;

  constructor(private ordersManagementService: OrdersManagementService) { }

  async ngOnInit() {
    await this.refresh(null);
    this.ordersManagementService.orderChange.subscribe(()=>{
      this.refresh(null);
    })
  }

  async getOrdersHistory(ev, reset: boolean = false) {
    if (reset) {
      this.ordersHistory = [];
      this.infineScrollEnable = true;
    }
    const query = await this.ordersManagementService.getOrdersHistory(reset);
    query.subscribe(data => {
      this.ordersHistory.push(...data.orders);
      if (ev) {
        ev.target.complete();
      }
    })
  }

  async getOrdersToDo(ev) {
    const query = await this.ordersManagementService.getOrdersUnfinished();
    query.subscribe(data => {
      this.categorizeOrdersUnfinished(data.orders);
      if (ev) {
        ev.target.complete();
      }
    })
  }

  private categorizeOrdersUnfinished(orders:Order[]){
    this.ordersToDo=[];
    this.ordersReady=[];
    orders.forEach(order=>{
      if(order.ready){
        this.ordersReady.push(order);
      }else{
        this.ordersToDo.push(order)
      }
    })
  }

  changePage(ev) {
    this.page = ev.detail.value
  }
  
  async refresh(ev) {
    await this.getOrdersHistory(ev, true);
    await this.getOrdersToDo(ev);
  }
}

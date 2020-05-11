import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../../interfaces/OrderInterface';
import { OrdersManagementService } from '../../../services/orders-management.service';
import { UIService } from '../../../services/ui.service';

@Component({
  selector: 'app-card-order-editable',
  templateUrl: './card-order-editable.component.html',
  styleUrls: ['./card-order-editable.component.scss'],
})
export class CardOrderEditableComponent implements OnInit {

  @Input() order: Order;

  status = {
    name: '',
    color: 'primary',
    icon: ''
  };

  showProducts = false;

  constructor(
    private ordersManagementService: OrdersManagementService,
    private uiService: UIService
  ) { }

  ngOnInit() {
    if (this.order.done) {
      this.status.name = 'Entregado'
      this.status.color = 'success'
      this.status.icon = 'checkmark-done-outline'
    } else if (this.order.ready) {
      this.status.name = 'Pendiente de entrega'
      this.status.color = 'warning'
      this.status.icon = "stopwatch-outline"
    } else {
      this.status.name = 'Por hacer'
      this.status.color = 'danger'
      this.status.icon = 'mail-unread-outline'
    }
  }

  async markAsDone() {
    const header = 'Confirmar entrega';
    const message = '¿Desea realizar la entrega del pedido de ' + this.order.client.mail + ' ?'
    const confirm = await this.uiService.presentAlertConfirm(header, message);
    if (confirm === true) {
      this.ordersManagementService.markOrderAsDone(this.order._id);
    }
  }

  async deleteOrder() {
    const header = 'Confirmar eliminacion';
    const message = '¿Desea eliminar el pedido de ' + this.order.client.mail + ' ?'
    const confirm = await this.uiService.presentAlertConfirm(header, message);
    if (confirm === true) {
      await this.ordersManagementService.deleteOrder(this.order._id);
    }
  }

  async changeReady(ev) {
    let res;
    if (this.order.ready) {
      res = await this.ordersManagementService.markOrderAsNoReady(this.order._id);
    } else {
      res = await this.ordersManagementService.markOrderAsReady(this.order._id);
    }
  }

}

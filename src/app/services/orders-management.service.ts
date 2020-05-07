import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';
import { OrdersResponse } from '../interfaces/OrderInterface';
import { UIService } from './ui.service';

const url = environment.url

@Injectable({
  providedIn: 'root'
})
export class OrdersManagementService {

  pageOrdersClient = 0;
  pageOrdersEmployee = 0;
  pageOrdersHistory=0;

  orderChange = new EventEmitter();

  constructor(
    private http: HttpClient, 
    private userService: UserService,
    private ui:UIService) { }

  async getOrdersUnfinished() {
    const token = await this.userService.getToken();
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.get<OrdersResponse>(`${url}/order/unfinished`,{headers});
  }

  deleteOrder(idOrder: string) {
    return new Promise(async resolve => {
      const token = await this.userService.getToken();
      const headers = new HttpHeaders({
        'x-token': token
      })
      this.http.delete(`${url}/order/remove/${idOrder}`, { headers }).subscribe(data => {
        if (data['ok']) {
          this.orderChange.emit();
          this.ui.presentToast("Pedido eliminado","warning")
          return resolve(true);
        } else {
          this.ui.presentToast("Error al eliminar el pedido","danger")
          return resolve(false);
        }
      });
    });
  }

  markOrderAsDone(idOrder: string) {
    return new Promise(async resolve => {
      const token = await this.userService.getToken()
      const headers = new HttpHeaders({
        'x-token': token
      })
      this.http.post(`${url}/order/markAsDone/${idOrder}`, null, { headers }).subscribe((data: any) => {
        if (data['ok']) {
          this.orderChange.emit();
          this.ui.presentToast("Pedido entregado!","success")
          return resolve(data.order);
        } else {
          this.ui.presentToast("Error al entregar el pedido","danger")
          return resolve(false)
        }
      })
    })
  }

  markOrderAsReady(idOrder: string) {
    return new Promise(async resolve => {
      const token = await this.userService.getToken()
      const headers = new HttpHeaders({
        'x-token': token
      })
      this.http.post(`${url}/order/markAsReady/${idOrder}`, null, { headers }).subscribe((data: any) => {
        if (data['ok']) {
          this.orderChange.emit();
          this.ui.presentToast("Pedido listo!","success")
          return resolve(data.order);
        } else {
          this.ui.presentToast("Error al marcar el pedido como preparado","danger")
          return resolve(false)
        }
      })
    })
  }

  markOrderAsNoReady(idOrder: string) {
    return new Promise(async resolve => {
      const token = await this.userService.getToken()
      const headers = new HttpHeaders({
        'x-token': token
      })
      this.http.post(`${url}/order/markAsNoReady/${idOrder}`, null, { headers }).subscribe((data: any) => {
        if (data['ok']) {
          this.orderChange.emit();
          this.ui.presentToast("Pedido marcado como por hacer","warning")
          return resolve(data.order);
        } else {
          this.ui.presentToast("Error al marcar el pedido como por hacer","danger")
          return resolve(false)
        }
      })
    })
  }

  async getOrdersClient(idClient: string, reset: boolean = false) {
    const token = await this.userService.getToken();
    const headers = new HttpHeaders({
      'x-token': token
    })
    if (reset) {
      this.pageOrdersClient = 0;
    }
    this.pageOrdersClient++;
    return this.http.get<OrdersResponse>(`${url}/order/client/${idClient}?page=${this.pageOrdersClient}`,{headers});
  }

  async getOrdersHistory(reset: boolean = false) {
    const token = await this.userService.getToken();
    const headers = new HttpHeaders({
      'x-token': token
    })
    if (reset) {
      this.pageOrdersHistory = 0;
    }
    this.pageOrdersHistory++;
    return this.http.get<OrdersResponse>(`${url}/order/history?page=${this.pageOrdersHistory}`,{headers});
  }


  async getOrdersEmployee(idEmployee: string, reset: boolean = false) {
    const token = await this.userService.getToken();
    const headers = new HttpHeaders({
      'x-token': token
    })
    if (reset) {
      this.pageOrdersEmployee = 0;
    }
    this.pageOrdersEmployee++;
    return this.http.get<OrdersResponse>(`${url}/order/employee/${idEmployee}?page=${this.pageOrdersEmployee}`,{headers});
  }


}

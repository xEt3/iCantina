import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';
import { OrdersResponse } from '../interfaces/OrderInterface';

const url = environment.url

@Injectable({
  providedIn: 'root'
})
export class OrdersManagementService {

  pageOrdersClient = 0;
  pageOrdersEmployee = 0;

  constructor(private http: HttpClient, private userService: UserService) { }

  async getOrdersUnfinished() {
    const token = await this.userService.getToken();
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.get<OrdersResponse>(`${url}/order/unfinished`);
  }

  deleteOrder(idOrder: string) {
    return new Promise(async resolve => {
      const token = await this.userService.getToken();
      const headers = new HttpHeaders({
        'x-token': token
      })
      this.http.delete(`${url}/order/remove/${idOrder}`, { headers }).subscribe(data => {
        if (data['ok']) {
          return resolve(true);
        } else {
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
          return resolve(data.order);
        } else {
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
    return this.http.get<OrdersResponse>(`${url}/order/client/${idClient}?page=${this.pageOrdersClient}`);
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
    return this.http.get<OrdersResponse>(`${url}/order/employee/${idEmployee}?page=${this.pageOrdersEmployee}`);
  }


}

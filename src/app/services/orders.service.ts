import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrdersResponse, Order } from '../interfaces/OrderInterface';
import { environment } from '../../environments/environment.prod';

const url = environment.url

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private userService: UserService, private http: HttpClient) { }

  async getMyOrders() {
    const token = await this.userService.getToken();
    const headers = new HttpHeaders({
      'x-token': token
    })
    return this.http.get<OrdersResponse>(`${url}/order/myOrders`, { headers });
  }

  newOrder(order: Order) {
    return new Promise(async resolve => {
      const token = await this.userService.getToken();
      const headers = new HttpHeaders({
        'x-token': token
      })
      this.http.post(`${url}/order`, order, { headers }).subscribe(data => {
        if (data['ok']) {
          return resolve(data['order'])
        } else {
          return resolve(false)
        }
      })
    })
  }

  

}


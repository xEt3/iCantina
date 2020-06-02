import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ProductsResponse } from '../interfaces/ProductInterfaces';

const url = environment.url;


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private pageProductAvailables = 0;
  private pageSearchProductAvailables = 0;

  constructor(private http: HttpClient) { }

  getProductAvailables(reset: boolean = false) {
    if (reset) {
      this.pageProductAvailables = 0;
    }
    this.pageProductAvailables++;
    return this.http.get<ProductsResponse>(`${url}/product/availables?page=${this.pageProductAvailables}`);
  }
  
  searchProductAvailables(term:string,reset: boolean = false) {
    if (reset) {
      this.pageSearchProductAvailables = 0;
    }
    this.pageSearchProductAvailables++;
    return this.http.get<ProductsResponse>(`${url}/product/availables/search/${term}?page=${this.pageSearchProductAvailables}`);
  }
}

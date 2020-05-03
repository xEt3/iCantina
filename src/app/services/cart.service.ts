import { Injectable } from '@angular/core';
import { ProductElement } from '../interfaces/OrderInterface';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartProducts: ProductElement[] = [];

  constructor(private storage:Storage) {
    this.loadStorage();
  }

  addProduct(productId: string,unitPrice:number, amount: number) {
    let productOrder = this.getProductElement(productId);
    if (productOrder == undefined) {
      this.cartProducts.push({ product: productId, amount,unitPrice});
      this.saveStorage();
    } else {
      productOrder.amount += amount;
    }
  }

  getProductElement(productId: string): ProductElement {
    let productElementFound: ProductElement;
    this.cartProducts.forEach(productElement => {
      if (productElement.product === productId) {
        productElementFound = productElement;
      }
    })
    return productElementFound;
  }

  removeProductElement(productId: string): boolean {
    let productElement = this.getProductElement(productId);
    if (productElement != undefined) {
      let index = this.cartProducts.indexOf(productElement);
      this.cartProducts.splice(index, 1);
      this.saveStorage();
      return true;
    } else {
      return false;
    }
  }

  editProductAmount(productId: string, amount: number): boolean {
    let productElement = this.getProductElement(productId);
    if (productElement != undefined && amount > 0) {
      let index = this.cartProducts.indexOf(productElement);
      productElement.amount = amount;
      this.saveStorage();
      return true;
    } else {
      return false;
    }
  }

  reset() {
    this.cartProducts = [];
    this.saveStorage();
  }

  getAllProductOrders() {
    return this.cartProducts;
  }

  async saveStorage() {
    await this.storage.set('cartProducts', this.cartProducts);
  }

  async loadStorage() {
    this.cartProducts = await this.storage.get('cartProducts') || null;
  }
}
  

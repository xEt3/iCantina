import { Injectable, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Product } from '../interfaces/ProductInterfaces';
import { ProductOrder } from '../../../model/productOrder';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartProducts: ProductOrder[] = [];
  price:number;
  constructor(private storage: Storage) {
    this.loadStorage();
  }

  newProductOrder = new EventEmitter();

  addProduct(product: Product, amount: number) {
    let productOrder = this.getProductElement(product._id);
    if (productOrder == undefined) {
      this.cartProducts.push(new ProductOrder(product, amount));
    } else {
      productOrder.amount += amount;
    }
    this.saveStorage();
  }

  getProductElement(productId: string): ProductOrder {
    let productOrderFound: ProductOrder;
    this.cartProducts.forEach(productOrder => {
      if (productOrder.product._id === productId) {
        productOrderFound = productOrder;
      }
    })
    return productOrderFound;
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

  calculatePrice(){
    this.price=0
    this.cartProducts.forEach(productOrder => {
      this.price+=productOrder.product.price*productOrder.amount;
    });
  }

  reset() {
    this.cartProducts = [];
    this.saveStorage();
  }

  async getAllProductOrders() {
    await this.loadStorage();
    return this.cartProducts;
  }

  async saveStorage() {
    await this.storage.set('cartProducts', this.cartProducts);
    this.calculatePrice();
    this.newProductOrder.emit('change');
  }

  async loadStorage() {
    let cartProductStorage: ProductOrder[] = []
    cartProductStorage = await this.storage.get('cartProducts');
    if (cartProductStorage) {
      this.cartProducts = cartProductStorage
      this.calculatePrice();
    }
  }
}


import { Product } from '../src/app/interfaces/ProductInterfaces';
export class ProductOrder{

    product:Product;
    amount:number;

    constructor(product:Product,amount:number){
        this.product=product;
        this.amount=amount;
    }

}
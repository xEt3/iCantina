import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { ProductsResponse, Product, productResponse } from '../interfaces/ProductInterfaces';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ProductsManagementService {

  private pageProducts = 0;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private fileTransefer: FileTransfer) { }

  async getProducts(reset: boolean = false) {
    const token = await this.userService.getToken();
    const headers = new HttpHeaders({
      'x-token': token
    })
    if (reset) {
      this.pageProducts = 0;
    }
    this.pageProducts++;
    return this.http.get<ProductsResponse>(`${url}/product?page=${this.pageProducts}`, { headers });
  }

  newProduct(product: Product) {
    return new Promise(async resolve => {
      const token = await this.userService.getToken();
      const headers = new HttpHeaders({
        'x-token': token
      })
      this.http.post<productResponse>(`${url}/product`, product, { headers }).subscribe(data => {
        if (data.ok) {
          return resolve(data.product);
        } else {
          return resolve(false);
        }
      });
    });
  }

  deleteProduct(idProduct: string) {
    return new Promise(async resolve => {
      const token = await this.userService.getToken();
      const headers = new HttpHeaders({
        'x-token': token
      })
      this.http.delete(`${url}/product/remove/${idProduct}`, { headers }).subscribe(data => {
        if (data['ok']) {
          return resolve(true);
        } else {
          return resolve(false);
        }
      });
    });
  }

  uploadImage(pathImg: string) {
    return new Promise(async resolve => {
      const token = await this.userService.getToken();
      const options: FileUploadOptions = {
        fileKey: 'image',
        headers: {
          'x-token': token
        }
      };
      const fileTransfer: FileTransferObject = this.fileTransefer.create();
      fileTransfer.upload(pathImg, `${url}/product/upload`, options).then((data: any) => {
        resolve(JSON.parse(data.response))
      }).catch(console.log)

    })
  }

  deleteTempFile(imageName: string) {
    return new Promise(async (resolve) => {
      const token = await this.userService.getToken();
      const headers = new HttpHeaders({
        'x-token': token
      })
      this.http.delete(`${url}/product/image/temp/${imageName}`, { headers }).subscribe((data) => {
        if (data[`ok`]) {
          this.userService.verifyToken();
          resolve(data);
        } else {
          resolve(false);
        }
      })
    })
  }

  deleteTempFolder() {
    return new Promise(async resolve => {
      const token = await this.userService.getToken();
      const headers = new HttpHeaders({
        'x-token': token
      })
      this.http.delete(`${url}/product/image/temp`, { headers }).subscribe(data => {
        if (data['ok']) {
          this.userService.verifyToken();
          return resolve(data);
        } else {
          return resolve(false);
        }
      })
    })
  }

  updateProduct(product:Product,idProduct:String) {
    return new Promise(async resolve => {
      const token = await this.userService.getToken();
      const headers = new HttpHeaders({
        'x-token': token
      })
      this.http.post<productResponse>(`${url}/product/update/${idProduct}`,product, { headers }).subscribe(data => {
        if (data.ok) {
          return resolve(data.product);
        } else {
          return resolve(false);
        }
      })
    })
  }

  deleteImgProduct(imageName: string,idProduct:string) {
    return new Promise(async (resolve) => {
      const token = await this.userService.getToken();
      const headers = new HttpHeaders({
        'x-token': token
      })
      this.http.delete<productResponse>(`${url}/product/image/product/${idProduct}/${imageName}`, { headers }).subscribe((data) => {
        if (data.ok) {
          resolve(data.product);
        } else {
          resolve(false);
        }
      })
    })
  }

}

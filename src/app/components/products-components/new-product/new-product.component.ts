import { Component, OnInit, ViewChild, ViewContainerRef, ApplicationRef } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { TempImage } from '../../../interfaces/interfaces';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ProductsManagementService } from '../../../services/products-management.service';
import { Product } from '../../../interfaces/ProductInterfaces';
import { UIService } from '../../../services/ui.service';
import { identifierModuleUrl } from '@angular/compiler';
import { TempImagesService } from '../../../temp-images.service';

declare var window: any;

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {

  @ViewChild("card-product", { read: ViewContainerRef,static:false }) container; 

  product:Product={
    name:"",
    price:0,
    imgs:[]
  }

  constructor(private modalController: ModalController,
    private camera: Camera,
    private productsManagementService: ProductsManagementService,
    private ui:UIService,
    private appReference:ApplicationRef,
    public tempImagesService:TempImagesService
  ) { }

  async ngOnInit() {
    await this.productsManagementService.deleteTempFolder()
    this.tempImagesService.tempImages=[];
  }

  
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 400,
      targetHeight: 400,
      allowEdit:true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.processImage(options);
  }

  galery() {
    const options: CameraOptions = {
      quality: 60,
      targetWidth: 300,
      targetHeight: 200,
      allowEdit:true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.processImage(options);
  }

  processImage(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let img = 'data:image/jpeg;base64,' + imageData;
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      
      this.productsManagementService.uploadImage(imageData).then((data: any) => {
        //revisar backend nombreImagen
        console.log(data);

        if (data.ImageName) {
          this.tempImagesService.tempImages.push({ img, nameImgServer: data.ImageName })
          this.appReference.tick()
        }
      });

    }, (err) => {
      // Handle error
    });
    
  }

  createProduct() {
    if(this.product.name.trim().length<=0){
      this.ui.presentToast('nombre invalido'+this.product.name);
      return
    }
    if (this.product.price<=0 ) {
      this.ui.presentToast('precio invalido');
      return;
    }
    this.productsManagementService.newProduct(this.product).then(data=>{
      if(data){
        this.ui.presentToast('Producto '+this.product.name+" creado");
        console.log(data)
        this.modalController.dismiss();
      }
    })
  }

  async deleteTempImage(imageName:string) {
    let isDeleted = await this.productsManagementService.deleteTempFile(imageName);
    if (isDeleted) {
      this.tempImagesService.tempImages = this.tempImagesService.tempImages.filter(tmpimg => tmpimg.nameImgServer != imageName);
      this.appReference.tick()
    }
  }

}

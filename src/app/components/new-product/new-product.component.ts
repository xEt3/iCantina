import { Component, OnInit } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { tempImage } from '../../interfaces/interfaces';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ProductsManagementService } from '../../services/products-management.service';

declare var window:any;

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {
  
  tempImages: tempImage[] = []

  constructor(private modalController:ModalController,
    private camera:Camera,
    private productsManagementService:ProductsManagementService
    ) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  takePhoto(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    this.procesarImagen(options);
  }

  galery(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.procesarImagen(options);
  }

  procesarImagen(options:CameraOptions){
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
 
      const img =  window.Ionic.WebView.convertFileSrc(imageData);
      this.productsManagementService.uploadImage(imageData).then((data:any)=>{
       
        if(data.nombreImagen){
          this.tempImages.push({img,nameImgServer:data.nombreImagen})
        }
      });
 
     //  let base64Image = 'data:image/jpeg;base64,' + imageData;
 
      console.log(this.tempImages)
     }, (err) => {
      // Handle error
     });
  }


}

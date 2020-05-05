import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UIService {



  constructor(private alertController: AlertController,
    private toastController: ToastController) { }


  async presentAlertConfirm(header:string,message:string) {
    let result:any
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            alert.dismiss(false);
            return false;
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            alert.dismiss(true);
            return false;
          }
        }
      ]
    });
    alert.present();
    result = await alert.onDidDismiss();
    return result.data;
  }

  async alertaInformativa(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 1500
    });
    toast.present();
  }
}

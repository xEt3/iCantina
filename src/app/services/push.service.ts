import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private oneSignal: OneSignal) { }

  initConfiguration() {
    this.oneSignal.startInit('6d199a80-94a9-4b03-a8b8-1c7005f5ab2e', '283447142110');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
     console.log('notification recived',noti)
    });

    this.oneSignal.handleNotificationOpened().subscribe((noti) => {
      // do something when a notification is opened
      console.log('notio was open',noti);
      
    });

    this.oneSignal.endInit();
  }

}

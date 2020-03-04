import { Injectable } from '@angular/core';
import { OneSignal, OSNotification } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  messages: any[] = [{
    title: 'Push prueba',
    body: 'mensaje one',
    date: new Date(),
    additionalData: {}
  }];

  constructor(
    private oneSignal: OneSignal
  ) { }

  configInit() {



    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    this.oneSignal.inFocusDisplaying( this.oneSignal.OSInFocusDisplayOption.Notification );

    this.oneSignal.handleNotificationReceived().subscribe( (noti) => {
      // do something when notification is received
      console.log('¡Notification recive', noti );
      this.notifyRecibed( noti )
    });

    this.oneSignal.handleNotificationOpened().subscribe( (noti) => {
      // do something when a notification is opened
      console.log('¡Notification open', noti );
    });

    this.oneSignal.endInit();
  }

  notifyRecibed( noti: OSNotification ) {
    const payload = noti.payload;
    // const exist = this.messages.find( message => message.notificationID === payload.notificationID );
    // noti.payload.additionalData

    this.messages.unshift( payload );
  }
}

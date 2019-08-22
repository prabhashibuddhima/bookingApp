import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { ToastController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  toast: any;

  constructor(private network: Network, public toastController: ToastController) { }
  checknetwork() {
    const disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.presentToast('Network was disconnected');
    });

    const connectSubscription = this.network.onConnect().subscribe(() => {
      this.toast.dismiss();
    });
  }

  async presentToast(message) {
    this.toast = await this.toastController.create({
      message: message,

    });
    this.toast.present();

  }
}
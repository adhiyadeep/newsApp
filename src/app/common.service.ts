import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public toastController: ToastController ) { }

  async showToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      position: 'bottom',
      duration:2000
    });
    toast.present();
  }
}

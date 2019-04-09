import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toastObj = {
    isShow: false,
    toastMsg: '',
    toastType: 'alert-info'

  }

  constructor() { }

  presentToastInfo(msg: string, time: number = 3000) {
    this.presentToast(msg, 'alert-info');
    this.dismissToast(time);
  }

  presentToastDanger(msg: string, time: number = 3000) {
    this.presentToast(msg, 'alert-danger');
    this.dismissToast(time);

  }

  presentToastWarning(msg: string, time: number = 3000) {
    this.presentToast(msg, 'alert-warning');
    this.dismissToast(time);
  }

  private dismissToast(time) {
    setTimeout(() => {
      this.toastObj.isShow = false;
    }, time)
  }

  private presentToast(msg, type) {
    this.toastObj.isShow = true;
    this.toastObj.toastMsg = msg;
    this.toastObj.toastType = type;
  }





}

import { Component, Injector } from '@angular/core';
import { BaseApp } from './common/base-app';
import { fade, toastFade } from './common/styles/animations';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [toastFade]
})
export class AppComponent extends BaseApp {
  constructor(private injector: Injector) {
    super(injector);
    firebase.initializeApp(this.CONSTANTS.FIREBASE_KEY);
  }
}

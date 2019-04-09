import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { fade } from '../../common/styles/animations';
import { FirebaseService } from '../../services/firebase/firebase-services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fade]
})
export class LoginComponent implements OnInit {



  constructor() {
  }

  ngOnInit() {

  }


}

import { Component, OnInit, Injector } from '@angular/core';
import { BaseApp } from '../../common/base-app';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent extends BaseApp implements OnInit {



  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
  }


}

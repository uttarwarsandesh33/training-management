import { Injectable, Injector } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BaseApp } from 'src/app/common/base-app';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService extends BaseApp implements CanActivate{

  constructor(
    public router: Router,
    injector: Injector) { 
    super(injector);
  }

  canActivate(): boolean {
    if (this.eventService.user.adminRole != true) {      
      this.toastService.presentToastDanger('You are not Admin');
      
      let roleType = sessionStorage.getItem('role'); 
      let url = '/home/' + roleType;
      this.router.navigate([`${url}`]) 
      //this.router.navigate(['/home/learner']);
      return false;
    }
    return true;
  }

}

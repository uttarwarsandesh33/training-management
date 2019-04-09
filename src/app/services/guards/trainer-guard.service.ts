import { Injectable, Injector } from '@angular/core';
import { BaseApp } from 'src/app/common/base-app';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TrainerGuardService extends BaseApp implements CanActivate{
  
    constructor(
      public router: Router,
      injector: Injector) { 
      super(injector);
    }
  
    canActivate(): boolean {
      if (this.eventService.user.trainerRole != true) {      
        this.toastService.presentToastDanger('You are not Trainer');
        let roleType = sessionStorage.getItem('role'); 
        let url = '/home/' + roleType;
        this.router.navigate([`${url}`]) 
        //this.router.navigate(['/home/learner']);
        return false;
      }
      return true;
    }
  
  }
  

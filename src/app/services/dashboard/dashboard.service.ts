import { HttpService } from '../http-service/http.service';
import { Injectable, Injector } from '@angular/core';
import { BaseApp } from '../../common/base-app';
import { IServiceResponse } from '../../common/models/service-response';


@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseApp {

  constructor(private httpService:HttpService,
    injector:Injector) { 
    super(injector);
  }

  getAdminDashboard(serviceResponse: IServiceResponse<any>) {
    
        let username = sessionStorage.getItem(this.CONSTANTS.SESSION_USER);
        this.httpService.get(this.URL_CONSTANTS.VIEW_DASHBOARD_ADMIN + `${username}`, serviceResponse);
      }

      getTrainerDashboard(serviceResponse: IServiceResponse<any>) {
        
            let username = sessionStorage.getItem(this.CONSTANTS.SESSION_USER);
            this.httpService.get(this.URL_CONSTANTS.VIEW_DASHBOARD_TRAINER +`${username}`, serviceResponse);
          }

          getLearnerDashboard(serviceResponse: IServiceResponse<any>) {
            
                let username = sessionStorage.getItem(this.CONSTANTS.SESSION_USER);
                this.httpService.get(this.URL_CONSTANTS.VIEW_DASHBOARD_LEARNER +`${username}`, serviceResponse);
              }

              getUpdateTrainer(body: any, serviceResponse: IServiceResponse<any>){
                this.httpService.post(this.URL_CONSTANTS.UPDATE_TRAINER_URL, serviceResponse, body);
              }
}

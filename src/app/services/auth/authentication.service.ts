import { Injectable, Injector } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { BaseApp } from '../../common/base-app';
import { IServiceResponse } from '../../common/models/service-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseApp {

  registrationData: any
  securityData: any

  constructor(
    private httpService: HttpService,
    injector: Injector
  ) {
    super(injector);
  }

  login(body: any, serviceResponse: IServiceResponse<any>) {
    this.httpService.post(this.URL_CONSTANTS.LOGIN_URL, serviceResponse, body);
  }

  getProfile(serviceResponse: IServiceResponse<any>) {

    let username = sessionStorage.getItem(this.CONSTANTS.SESSION_USER);
    this.httpService.get(`${username}`, serviceResponse);
  }

  register(serviceResponse: IServiceResponse<any>) {
    this.httpService.post(this.URL_CONSTANTS.REG_URL, serviceResponse, this.registrationData);
  }

  forgot(body: any, serviceResponse: IServiceResponse<any>) {
    this.httpService.post(this.URL_CONSTANTS.FORGOT_PASSWORD_URL, serviceResponse, body);
  }

  updateProfile(body: any, serviceResponse: IServiceResponse<any>) {
    let profile = this.eventService.user;
    profile.bio = body.bio;
    profile.contact = body.contact;
    this.httpService.post(this.URL_CONSTANTS.UPDATE_PROFILE_URL, serviceResponse, profile);

  }

  addUser(body: any, serviceResponse: IServiceResponse<any>) {
    this.httpService.post(this.URL_CONSTANTS.ADD_USER_URL, serviceResponse, body);
  }

  addTraining(body: any, serviceResponse: IServiceResponse<any>) {
    this.httpService.post(this.URL_CONSTANTS.ADD_TRAINING_URL, serviceResponse, body);
  }

  welcome(body:any, serviceResponse: IServiceResponse<any>) {    
        this.httpService.post(this.URL_CONSTANTS.WELCOME, serviceResponse, body);
  }

  
}


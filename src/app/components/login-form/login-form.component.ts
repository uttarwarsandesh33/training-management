import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseApp } from '../../common/base-app';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpService } from '../../services/http-service/http.service';
import { IServiceResponse } from '../../common/models/service-response';
import { AuthenticationService } from '../../services/auth/authentication.service';

import * as firebase from 'firebase';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent extends BaseApp implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  showPass: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private authService: AuthenticationService,
    injector: Injector) {
    super(injector);
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.PATTERN_CONSTANTS.EMAIL_PATTERN)]],
      password: ['', Validators.compose([Validators.required, Validators.pattern(this.PATTERN_CONSTANTS.PASSWORD_PATTERN)])]
    });
  }

  ngOnInit() {

  }

  get email() {
    return this.loginForm.controls['email']
  }

  get password() {
    return this.loginForm.controls['password']
  }

  applyClass(control) {
    return control.touched ? (control.invalid ? 'is-invalid' : 'is-valid') : '';
  }

  show() {
    this.showPass = !this.showPass;
  }
  // 9789000010134

  loginResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      console.log("loginResponse objcet : ", data);
      this.eventService.eventEmitter.emit(this.CONSTANTS.SESSION_USER_LOGGED_IN, data);
      this.eventService.eventEmitter.emit(this.CONSTANTS.SESSION_USER_PROFILE, data);
      this.toastService.presentToastInfo('Login Successful');
      let profile = data;
      this.router.navigate(['/home/learner'])
      // this.firebaseService.updateProfile(profile);
    },
    fail: (error) => {
      console.log("loginResponse Error - ", error);
      this.toastService.presentToastDanger(error);
    }
  }


  profileResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      console.log("profile objcet : ", data);
      this.eventService.eventEmitter.emit(this.CONSTANTS.SESSION_USER_PROFILE, data.result);
      this.toastService.presentToastInfo('Login Successful');
      let profile = data.result;
      this.router.navigate(['/home/learner'])
      this.firebaseService.updateProfile(profile);
    },
    fail: (errorService) => {
      console.log("profile Error - ", errorService);
      this.toastService.presentToastDanger('Something went wrong, please try again later.');
    }
  }


  login() {
    // this.authService.login(this.loginForm.value, this.loginResponse)
    // this.loginForm.reset();
    console.log("login form res", this.loginForm.value);
    this.firebaseService.loginUser(this.loginForm.value, this.loginResponse);
  }

  getProfile() {
    this.authService.getProfile(this.profileResponse);
  }

  welcomeResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      console.log("welcome objcet : ", data);

    },
    fail: (errorService) => {
      console.log("welcome Error - ", errorService);
      this.toastService.presentToastDanger('Something went wrong, please try again later.');
    }
  }

  welcomeData =
    {
      email: "ashu.dhiman@capco.com",
      userType: "Trainer"
    }

  welcome() {
    this.authService.welcome(this.welcomeData, this.welcomeResponse)
  }

  // addUserResponse = <IServiceResponse<any>>{
  //   success: (data: any) => {
  //     console.log("addUserResponse objcet : ", data);
  //     this.eventService.eventEmitter.emit(this.CONSTANTS.SESSION_USER_LOGGED_IN, data);
  //   },
  //   fail: (error) => {
  //     console.log("addUserResponse Error - ", error);
  //     this.toastService.presentToastDanger( error.error.message);
  //   }
  // }

  // addUser() {
  //   this.authService.addUser(this.welcomeData,this.addUserResponse);
  //   //console.log("addUser form res",this.addUserForm.value);
  //   //this.addUserForm.reset();

  // }

}

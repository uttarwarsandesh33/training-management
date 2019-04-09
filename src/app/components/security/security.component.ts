import { Component, OnInit, Input, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BaseApp } from '../../common/base-app';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { Router } from '@angular/router';
import { IServiceResponse } from '../../common/models/service-response';


@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent extends BaseApp implements OnInit {

  @Input('in') isRegistraion: boolean

  securityForm: FormGroup;



  constructor(private formBuilder: FormBuilder,
    private router: Router, private authenticationService: AuthenticationService,
    injector: Injector) {
    super(injector);
    this.securityForm = this.formBuilder.group({
      firstCompany: ['', [Validators.required, Validators.maxLength(50)]],
      maidenName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(this.PATTERN_CONSTANTS.NAME_PATTERN)]],
    });

    if (!authenticationService.registrationData) {
      this.router.navigate(['/register']);
    }
    console.log("-->", authenticationService.registrationData)
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('called', this.securityForm);
    this.authenticationService.securityData = this.securityForm.value;
    console.log("Security-->", this.authenticationService.securityData);
    console.log("reg-->", this.authenticationService.registrationData);
    let regData = this.authenticationService.registrationData;
    let secData = this.authenticationService.securityData;

    let regSecData = Object.assign(regData, secData);
    console.log("DATA-->", regSecData);
  }

  get firstCompany() {
    return this.securityForm.controls['firstCompany']
  }

  get maidenName() {
    return this.securityForm.controls['maidenName']
  }

  applyClass(control) {
    return control.touched ? (control.invalid ? 'is-invalid' : 'is-valid') : '';
  }

  regResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      console.log("loginResponse objcet : ", data);
      this.toastService.presentToastInfo('Registered Successfully');
      this.router.navigate(['/login']);
    },
    fail: (error) => {
      console.log("regResponse Error - ", error);
      this.toastService.presentToastDanger(error);
      this.router.navigate(['/login']);
    }
  }

  register() {
    this.authenticationService.registrationData['securityQa'] = this.securityForm.value;
    this.authenticationService.registrationData['learnerRole'] = true;
    this.authenticationService.registrationData['trainerRole'] = false;
    this.authenticationService.registrationData['adminRole'] = false;
    console.log("register data check", this.authenticationService.registrationData)
    // this.authenticationService.register(this.regResponse);
    this.firebaseService.registerUser(this.authenticationService.registrationData, this.regResponse)
  }


}

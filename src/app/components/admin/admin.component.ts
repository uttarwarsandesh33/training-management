import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseApp, TrainingErrorHandler } from '../../common/base-app';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpService } from '../../services/http-service/http.service';
import { IServiceResponse } from '../../common/models/service-response';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { CustomValidators } from '../../common/validations/CustomValidators';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent extends BaseApp implements OnInit {
  adminData: any;
  addUserForm: FormGroup;
  addTrainingForm: FormGroup;
  PATTERN_CONSTANTS: any;
  firebaseAdminData: any;


  adminObj = [
    { trainingName: 'Angular 7', category: 'Frontend', trainer: 'Mr.XYZ' },
    { trainingName: 'Core Java', category: 'Backend', trainer: 'Mr.MNB' },
  ];

  userTypeObj = [{ type: 'Admin' }, { type: 'Trainer' }];

  courseCategoryObj = [
    { category: 'Frontend' },
    { category: 'Backend' },
    { category: 'BA' },
    { category: 'Dev Ops' },
    { category: 'Testing' },
  ];
  userType: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private dashboardService: DashboardService,
    private authService: AuthenticationService,
    injector: Injector
  ) {
    super(injector);
    this.formInit()

  }

  ngOnInit() {
    this.getAdminDashboard();
  }

  formInit() {
    this.addUserForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          CustomValidators.cannotStartWithSpace,
          Validators.pattern(this.PATTERN_CONSTANTS.EMAIL_PATTERN),
        ],
      ],
      userType: ['Admin'],
    });

    this.addTrainingForm = this.formBuilder.group({
      courseName: [
        '',
        [
          Validators.required,
          Validators.maxLength(70),
          CustomValidators.cannotStartWithSpace,
        ],
      ],
      courseCategory: ['Frontend'],
      description: new FormControl('', [Validators.maxLength(700), CustomValidators.cannotStartWithSpace,]),
      trainerEmail: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(this.PATTERN_CONSTANTS.EMAIL_PATTERN),
        ],
      ],
    });
  }


  ngAfterContentInit() {
    console.log('admin loaded');
  }

  submit() {
    console.log('add-userForm', this.addUserForm.value);
  }

  submitTraining() {
    console.log('add-trainingForm', this.addTrainingForm.value);
  }

  get email() {
    return this.addUserForm.controls['email'];
  }

  get description() {
    return this.addTrainingForm.controls['description'];
  }

  get courseName() {
    return this.addTrainingForm.controls['courseName'];
  }

  get trainerEmail() {
    return this.addTrainingForm.controls['trainerEmail'];
  }
  get courseCategory() {
    return this.addTrainingForm.controls['courseCategory'];
  }

  applyClass(control) {
    return control.touched ? (control.invalid ? 'is-invalid' : 'is-valid') : '';
  }

  addUserResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      console.log('addUserResponse objcet : ', data);
      this.formInit();
      this.toastService.presentToastInfo('User added successfully');
    },
    fail: error => {
      console.log('addUserResponse Error - ', error);
      this.toastService.presentToastDanger('something went wrong');
    },
  };

  addUser() {
    // this.authService.addUser(this.addUserForm.value, this.addUserResponse);
    this.firebaseService.updateRole(this.addUserForm.value, this.addUserResponse)
    console.log('addUser form res', this.addUserForm.value);
    this.addUserForm.controls['userType'].setValue('Admin');
  }

  addTrainingResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      this.toastService.presentToastInfo('Training added successfully');
      this.formInit();
    },
    fail: error => {
      console.log('addTrainingResponse Error - ', error);
      this.toastService.presentToastDanger(error);
    },
  };

  addTraining() {
    // this.authService.addTraining(
    //   this.addTrainingForm.value,
    //   this.addTrainingResponse
    // );
    // console.log('addTraining form res', this.addTrainingForm.value);
    //this.addTrainingForm.reset();
    this.firebaseService.addTraining(this.addTrainingForm.value, this.addTrainingResponse);
  }

  getAdminDashboardResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      // console.log('getAdminDashboard objcet : ', data);
      // this.adminData = data.result;
      // console.log("GetAdminData",this.adminData);

      this.adminData = [];
      this.firebaseAdminData = data;

      data.forEach(r => {
        this.adminData.push(r.data())
      });
    },
    fail: error => {
      console.log('addAdminResponse Error - ', error);
      this.toastService.presentToastDanger('something went wrong');
    },
  };

  getAdminDashboard() {
    // this.dashboardService.getAdminDashboard(this.getAdminDashboardResponse);
    this.firebaseService.getAllTrainingsAdmin(this.getAdminDashboardResponse);
  }
}

import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Component, OnInit, Injector } from "@angular/core";
import { BaseApp } from "../../common/base-app";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { CustomValidators } from "../../common/validations/CustomValidators";
import { IServiceResponse } from '../../common/models/service-response';
import { TrainingData } from '../../common/models/training-data.class';

@Component({
  selector: "app-trainer",
  templateUrl: "./trainer.component.html",
  styleUrls: ["./trainer.component.scss"]
})
export class TrainerComponent extends BaseApp implements OnInit {

  trainerForm: FormGroup;
  trainingList: TrainingData[] = [];
  trainingCategory: any
  // completionStatus: any = "no"
  firebaseTrainingList: any;
  modalData: any;
  currentIndex: 0;


  constructor(private formBuilder: FormBuilder,
    private dashboardService: DashboardService, injector: Injector) {
    super(injector);
    this.trainerForm = this.formBuilder.group({
      trainingName: [""],
      trainingType: [""],
      startDate: [''],
      startTime: [''],
      endTime: [''],
      completionStatus: ['']
    });
  }

  ngOnInit() {
    this.getTrainerDashboard();
  }

  getfirebaseDate(date) {
    return date.toDate();
  }

  formatDate = date => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  ngAfterContentInit() {
    console.log('trainer loaded');
    // TODO Api call to do
    // this.getTrainerDashboard();

  }

  get trainingName() {
    return this.trainerForm.controls["trainingName"];
  }

  get trainingType() {
    return this.trainerForm.controls["trainingType"];
  }

  get startDate() {
    return this.trainerForm.controls["startDate"];
  }

  get startTime() {
    return this.trainerForm.controls["startTime"];
  }

  get endTime() {
    return this.trainerForm.controls["endTime"];
  }

  get completionStatus() {
    return this.trainerForm.controls["completionStatus"];
  }

  set completionStatus(val) {
    this.trainerForm.controls['completionStatus'].setValue(val)
  }

  set startDate(val) {
    this.trainerForm.controls['startDate'].setValue(val)
  }

  set startTime(val) {
    this.trainerForm.controls["startTime"].setValue(val)
  }

  set endTime(val) {
    this.trainerForm.controls["endTime"].setValue(val)
  }

  applyClass(control) {
    return control.touched ? (control.invalid ? "is-invalid" : "is-valid") : "";
  }

  getTrainerDashboardResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      this.trainingList = [];
      this.firebaseTrainingList = data;

      data.forEach(r => {
        this.trainingList.push(r.data())
      });
      console.log(this.trainingList);
    },
    fail: error => {
      console.log('getTrainerDashboard Error - ', error);
      this.toastService.presentToastDanger(error.error.message);
    },
  };


  updateTrainingResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      this.toastService.presentToastInfo(data);
    },
    fail: error => {
      console.log('getTrainerDashboard Error - ', error);
      this.toastService.presentToastDanger(error.error.message);
    },
  };


  getTrainerDashboard() {
    let username = sessionStorage.getItem(this.CONSTANTS.SESSION_USER);
    this.firebaseService.getAllTrainings(username, this.getTrainerDashboardResponse);
  }

  updateTrainer() {
    console.log("Update", this.trainerForm.value);
  }

  openModal(index) {
    console.log(this.firebaseTrainingList.docs[index].id, this.trainerForm.value);
    this.modalData = this.firebaseTrainingList.docs[index].data();
    console.log('modal data is ', this.modalData)
    this.completionStatus = this.modalData.completionStatus ? this.modalData.completionStatus : 'no';
    this.startDate = this.modalData.startDate ? this.modalData.startDate : '';
    this.startTime = this.modalData.startTime ? this.modalData.startTime : '';
    this.endTime = this.modalData.endTime ? this.modalData.endTime : '';
    this.currentIndex = index;
  }

  updateTraining() {
    this.firebaseService.updateTraining(this.firebaseTrainingList.docs[this.currentIndex].id, this.trainerForm.value, this.updateTrainingResponse);
  }
}

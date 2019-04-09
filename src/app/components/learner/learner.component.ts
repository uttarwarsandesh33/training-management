import { Component, OnInit } from '@angular/core';
import { BaseApp } from "src/app/common/base-app";
import { Injector } from "@angular/core";
import { IServiceResponse } from '../../common/models/service-response';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { TrainingData } from '../../common/models/training-data.class';

@Component({
  selector: 'app-learner',
  templateUrl: './learner.component.html',
  styleUrls: ['./learner.component.scss'],
})
export class LearnerComponent extends BaseApp implements OnInit {

  learnerObj: TrainingData[] = [];
  modalData: TrainingData = new TrainingData();

  constructor(private dashboardService: DashboardService,
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.getLearnerDashboard();
   }

  ngAfterContentInit() {
    console.log('admin loaded');
    // TODO Api call to do
    // this.getLearnerDashboard();
  }

  getLearnerDashboardResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      console.log('getLearnerDashboard objcet : ', data);
      this.learnerObj = [];
      data.forEach(r => {
        this.learnerObj.push(r.data())
      });
      // this.learnerObj = data;
    },
    fail: error => {
      console.log('getLearnerDashboard Error - ', error);
      this.toastService.presentToastDanger(error.error.message);
    },
  };

  getLearnerDashboard() {
    this.firebaseService.getTrainingLearner(this.eventService.user.skill, this.getLearnerDashboardResponse)
  }

  openModal(learnerData) {
    this.modalData = learnerData;
    console.log('modal data', this.modalData);
  }
}

import { Injectable, Injector } from '@angular/core';
import * as firebase from 'firebase';
import { UserProfile } from '../../common/models/user-profile';
import { IServiceResponse } from '../../common/models/service-response';
import { TrainingData } from '../../common/models/training-data.class';
import { BaseApp } from '../../common/base-app';
import { WindowScrolling } from '../../components/loading/WindowScrolling';
import { EventService } from '../event.service';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  windowScrolling = new WindowScrolling();

  constructor(private eventService: EventService) {
  }


  registerUser(profile: any, registerUserResponse: IServiceResponse<any>) {
    this.presentLoading(true);
    console.log('register user called', profile);
    let data = {
      adminRole: profile.adminRole,
      dob: profile.dob,
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      learnerRole: profile.learnerRole,
      password: profile.password,
      securityQa: profile.securityQa,
      skill: profile.skill,
      trainerRole: profile.trainerRole
    }
    firebase.firestore().collection('users').doc(profile.email).get().then(res => {
      if (res.data()) {
        registerUserResponse.fail('user already registered');
      } else {
        firebase.firestore().collection('users').doc(profile.email).set(data).then(res => {
          registerUserResponse.success('User registered successfully')
        }, err => {
          registerUserResponse.fail('something went wrong');
        })
      }
    }).finally(() => {
      this.presentLoading(false);
    })
  }

  loginUser(login: any, loginResponse: IServiceResponse<any>) {
    this.presentLoading(true);
    firebase.firestore().collection('users').doc(login.email).get().then(res => {
      console.log('logged in user', res.data());
      if (res.data()) {
        if (login.password == res.data().password) {
          loginResponse.success(res.data())
        } else {
          loginResponse.fail('bad credentials')
        }
      } else {
        loginResponse.fail('user not found')
      }
    }).finally(() => {
      this.presentLoading(false);
    })
  }


  updateRole(roleObj: any, roleResponse: IServiceResponse<any>) {
    this.presentLoading(true);
    firebase.firestore().collection('users').doc(roleObj.email).get().then(res => {
      if (res.data()) {
        if (roleObj.userType == 'Admin') {
          firebase.firestore().collection('users').doc(roleObj.email).update({
            'adminRole': true
          }).then(() => {
            roleResponse.success('User added successfully')
          }, err => {
            roleResponse.fail('Something went wrong!!');
          })
        } else {
          firebase.firestore().collection('users').doc(roleObj.email).update({
            'trainerRole': true
          }).then(() => {
            roleResponse.success('User added successfully')
          }, err => {
            roleResponse.fail('Something went wrong!!');
          })
        }
      } else {
        roleResponse.fail('User not found !!');
      }
    }).finally(() => {
      this.presentLoading(false);
    })
  }

  forgotPassword(passwordObj: any, forgotPasswordResponse: IServiceResponse<any>) {
    this.presentLoading(true);
    firebase.firestore().collection('users').doc(passwordObj.email).get().then(res => {
      if (res.data()) {

        if (passwordObj.question == 'dob') {
          if (passwordObj.answer == res.data().dob) {
            this.updatePassword(passwordObj.email, passwordObj.password, forgotPasswordResponse);
          } else {
            forgotPasswordResponse.fail('answer is wrong');
          }
        } else {
          if (passwordObj.question == 'firstCompany') {
            if (passwordObj.answer == res.data().securityQa.firstCompany) {
              this.updatePassword(passwordObj.email, passwordObj.password, forgotPasswordResponse);
            } else {
              forgotPasswordResponse.fail('answer is wrong');
            }
          } else {
            if (passwordObj.answer == res.data().securityQa.maidenName) {
              this.updatePassword(passwordObj.email, passwordObj.password, forgotPasswordResponse);
            } else {
              forgotPasswordResponse.fail('answer is wrong');
            }
          }
        }
      } else {
        forgotPasswordResponse.fail('user not found');
      }
    }).finally(() => {
      this.presentLoading(false);
    })
  }

  updatePassword(email, password1, forgotPasswordResponse: IServiceResponse<any>) {
    this.presentLoading(true);
    firebase.firestore().collection('users').doc(email).update({
      password: password1
    }).then(() => {
      forgotPasswordResponse.success('Password updated successfully');
    }, err => {
      forgotPasswordResponse.fail('something went wrong');
    }).finally(() => {
      this.presentLoading(false);
    })
  }


  updateProfile(profile: UserProfile) {
    let data = profile.email
    console.log('firebase called', data)
    this.presentLoading(true);
    firebase.firestore().collection('users').doc(data + '').set({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      dob: profile.dob,
      learnerRole: profile.learnerRole,
      adminRole: profile.adminRole,
      trainerRole: profile.trainerRole
    }).then(res => {
      console.log('data added success');
    }, err => {
      console.log('firebase error', err)
    }).finally(() => {
      this.presentLoading(false);
    });
  }

  addTraining(training, addTrainingResponse: IServiceResponse<any>) {
    console.log('addTraining called', training);
    this.presentLoading(true);
    firebase.firestore().collection('users').doc(training.trainerEmail).get().then((res) => {
      console.log(res.data());
      let result = res.data();
      if (result) {
        if (result.trainerRole) {
          let trainingRes = <TrainingData>{
            trainingName: training.courseName,
            courseCategory: training.courseCategory,
            trainer: result,
            description: training.description,
            trainerEmail: training.trainerEmail
          }
          firebase.firestore().collection('trainings').add(trainingRes).then((res) => {
            addTrainingResponse.success('Training added successfully');
          })
        } else {
          addTrainingResponse.fail('User is not trainer');
        }
      } else {
        addTrainingResponse.fail('user not found')
      }
    }, err => {
      console.log('something went wrong');
    }).finally(() => {
      this.presentLoading(false);
    })
  }

  getAllTrainings(email, getTrainingResponse: IServiceResponse<any>) {
    firebase.firestore().collection('trainings').where("trainerEmail", "==", email).onSnapshot((res) => {
      getTrainingResponse.success(res);
    })
  }

  getTrainingLearner(skill, getTrainingResponse: IServiceResponse<any>) {
    firebase.firestore().collection('trainings').where("courseCategory", "==", skill).onSnapshot((res) => {
      getTrainingResponse.success(res);
    });

  }

  getAllTrainingsAdmin(getAdminTrainingResponse: IServiceResponse<any>) {
    firebase.firestore().collection('trainings').onSnapshot((res) => {
      getAdminTrainingResponse.success(res);
    });
  }

  updateTraining(id: string, trainingData, updateTrainingResponse: IServiceResponse<any>) {
    let data = {
      startDate: trainingData.startDate,
      startTime: trainingData.startTime,
      endTime: trainingData.endTime,
      completionStatus: trainingData.completionStatus
    }
    this.presentLoading(true);
    console.log('update data', data)
    firebase.firestore().collection('trainings').doc(id).update(data).then(res => {
      console.log('training updated');
      updateTrainingResponse.success('training updated');
    }).finally(() => {
      this.presentLoading(false);
    });
  }

  presentLoading(data) {
    console.log('present loading called')
    this.eventService.loading = data;
    if (data) {
      this.windowScrolling.disable();
    } else {
      this.windowScrolling.enable();
    }
  }

}

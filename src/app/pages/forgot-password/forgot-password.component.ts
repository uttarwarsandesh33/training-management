import { Component, OnInit, Injector } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { CustomValidators } from "../../common/validations/CustomValidators";
import { BaseApp } from "../../common/base-app";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { fade } from "../../common/styles/animations";
import { AuthenticationService } from "../../services/auth/authentication.service";
import { IServiceResponse } from "../../common/models/service-response";
import { SecurityQuestions } from "../../common/models/security";
import { ForgotPassword } from "../../common/models/forgot-password.class";
import { Router } from '@angular/router';

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
  animations: [fade]
})
export class ForgotPasswordComponent extends BaseApp implements OnInit {
  constructor(
    injector: Injector,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    super(injector);
    this.today = this.formatDate(new Date());
    this.maxDate = this.formatDate(this.formattedMinDate);
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(this.PATTERN_CONSTANTS.EMAIL_PATTERN)
      ]),
      // selectQuestion: new FormControl("", [Validators.required]),
      answer: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
        CustomValidators.cannotContainSpace,
        CustomValidators.checkAge
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.min(6),
        Validators.max(15),
        Validators.pattern(this.PATTERN_CONSTANTS.PASSWORD_PATTERN)
      ])
    });
  }

  get email() {
    return this.forgotPasswordForm.controls["email"];
  }

  get answer() {
    return this.forgotPasswordForm.controls["answer"];
  }

  get password() {
    return this.forgotPasswordForm.controls["password"];
  }
  questions = "firstCompany";

  public forgotPasswordForm: FormGroup;
  showPass = false;

  date: Date = new Date();
  formattedMinDate =
    this.date.getFullYear() -
    18 +
    "/" +
    this.date.getMonth() +
    "/" +
    this.date.getDate();
  today;
  maxDate;

  forgotResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      console.log("forgotResponse objcet : ", data);
      this.toastService.presentToastInfo("Password changed successfully");
      this.router.navigate(['/login']);
    },
    fail: (error) => {
      console.log("forgotResponse Error - ", error);
      this.toastService.presentToastDanger(error);
    }
  };

  ngOnInit() { }

  submit() {
    const body = new ForgotPassword();
    body.email = this.email.value;
    body.password = this.password.value;
    body.question = this.questions;
    if (body.question == 'dob') {
      body.answer = this.changeDate(this.answer.value);
    } else {
      body.answer = this.answer.value;
    }
    // body.qa[this.questions] = this.answer.value;
    console.log("answer ", body);
    this.firebaseService.forgotPassword(body, this.forgotResponse);
  }

  applyClass(control) {
    return control.touched ? (control.invalid ? "is-invalid" : "is-valid") : "";
  }

  show() {
    this.showPass = !this.showPass;
  }

  formatDate = date => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }

    return [year, month, day].join("-");
  };

  changeDate(date: string) {
    let d = date.split('-');
    return d[1] + '/' + d[2] + '/' + d[0];
  }
}

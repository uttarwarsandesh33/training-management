import { Component, OnInit, Injector } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { CustomValidators } from "../../common/validations/CustomValidators";
import { BaseApp } from "../../common/base-app";
import { AuthenticationService } from "../../services/auth/authentication.service";

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"]
})
export class RegisterFormComponent extends BaseApp implements OnInit {
  registerForm: FormGroup;
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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    injector: Injector
  ) {
    super(injector);
    this.today = this.formatDate(new Date());
    this.maxDate = this.formatDate(this.formattedMinDate);

    this.registerForm = this.formBuilder.group({
      firstName: [
        "",
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.PATTERN_CONSTANTS.NAME_PATTERN),
          CustomValidators.cannotContainSpace
        ]
      ],
      lastName: [
        "",
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.PATTERN_CONSTANTS.NAME_PATTERN),
          CustomValidators.cannotContainSpace
        ]
      ],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern(this.PATTERN_CONSTANTS.EMAIL_PATTERN),
          CustomValidators.cannotContainSpace
        ]
      ],
      dob: new FormControl(this.maxDate, [
        Validators.required,
        CustomValidators.checkAge
      ]),
      skill: new FormControl("Frontend"),
      password: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(this.PATTERN_CONSTANTS.PASSWORD_PATTERN)
        ])
      ]
    });
  }

  ngOnInit() {}

  submit() {
    console.log("called", this.registerForm);
    this.authenticationService.registrationData = this.registerForm.value;
    this.authenticationService.registrationData.dob = CustomValidators.dateConverter(this.dob.value);
    console.log('>>>>>>>>>',this.authenticationService.registrationData);
    this.router.navigate(["register/security"]);
  }

  get firstName() {
    return this.registerForm.controls["firstName"];
  }

  get lastName() {
    return this.registerForm.controls["lastName"];
  }

  get email() {
    return this.registerForm.controls["email"];
  }

  get password() {
    return this.registerForm.controls["password"];
  }

  get dob() {
    return this.registerForm.controls["dob"];
  }

  applyClass(control) {
    return control.touched ? (control.invalid ? "is-invalid" : "is-valid") : "";
  }

  show() {
    this.showPass = !this.showPass;
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

}

import { Injectable } from "@angular/core";
import * as EventEmitter from "events";
import * as APP_CONSTANTS from "../common/constants/constants";
import { UserProfile } from "../common/models/user-profile";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})

export class EventService {
  loading = false;
  private _user = new UserProfile();
  eventEmitter = new EventEmitter();
  private _role = "learner";

  constructor(router: Router) {

    this.eventEmitter.on(APP_CONSTANTS.SESSION_USER_LOGGED_IN, (res) => {
      console.log('event emitted', res)
      sessionStorage.setItem(APP_CONSTANTS.SESSION_USER, res.email);
    });

    this.eventEmitter.on(APP_CONSTANTS.SESSION_USER_PROFILE, (res) => {
      console.log('user profile success', res);
      sessionStorage.setItem(APP_CONSTANTS.SESSION_USER_LOGGED_IN, 'true')
      sessionStorage.setItem(APP_CONSTANTS.SESSION_USER_PROFILE, JSON.stringify(res));
      this._user = res;
    });

    this.eventEmitter.on(APP_CONSTANTS.SESSION_USER_LOGGED_OUT, (res) => {
      router.navigate(["/"]);
      sessionStorage.clear();
      localStorage.clear();
    });
  }

  get token() {
    return sessionStorage.getItem(APP_CONSTANTS.SESSION_TOKEN);
  }

  get user() {
    this._user = JSON.parse(sessionStorage.getItem(APP_CONSTANTS.SESSION_USER_PROFILE));
    return this._user;
  }

  get role()
  {
    this._role = sessionStorage.getItem('role');
    return this._role;
  }
}

import { Component, OnInit, Injector } from '@angular/core';
import { BaseApp } from '../../common/base-app';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent extends BaseApp implements OnInit {

  roleType: string = 'learner';

  constructor(private router: Router,
    injector: Injector,
  ) {

    super(injector);
    if (sessionStorage.getItem('role')) {
      this.roleType = sessionStorage.getItem('role');
    } else {
      sessionStorage.setItem('role', this.roleType);
    }
  }

  ngOnInit() {
  }

  logout() {
    this.eventService.eventEmitter.emit(this.CONSTANTS.SESSION_USER_LOGGED_OUT);
  }

  setRole(role) {
    this.roleType = role
    sessionStorage.setItem('role', role);
  }

  homeNavigate() {
    let url = '/home/' + this.roleType;
    this.router.navigate([`${url}`])
  }

}

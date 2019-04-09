import { CanActivate, CanActivateChild } from '@angular/router/public_api';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import * as ROUTE_CONSTANTS from './common/constants/routing-constants';
import { HomeComponent } from "./pages/home/home.component";
import { FaqComponent } from "./pages/faq/faq.component";
import { LandingComponent } from "./pages/landing/landing.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { AuthGuardService } from "./services/guards/auth-guard.service";
import { LoginComponent } from "./pages/login/login.component";
import { MyProfileComponent } from "./pages/my-profile/my-profile.component";
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password.component";
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { SecurityComponent } from './components/security/security.component';
import { LearnerComponent } from './components/learner/learner.component';
import { TrainerComponent } from './components/trainer/trainer.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuardService } from './services/guards/admin-guard.service';
import { TrainerGuardService } from './services/guards/trainer-guard.service';

const routes: Routes = [
  {
    path: "", component: LoginComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: ROUTE_CONSTANTS.LOGIN_ROUTE, component: LoginFormComponent },
      { path: ROUTE_CONSTANTS.REGISTER_ROUTE, component: RegisterFormComponent },
      { path: ROUTE_CONSTANTS.SECURITY_ROUTE, component: SecurityComponent }
    ]
  },

  { path: ROUTE_CONSTANTS.FORGOT_PASS_ROUTE, component: ForgotPasswordComponent },

  {
    path: ROUTE_CONSTANTS.HOME_ROUTE,
    component: LandingComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: 'my-profile', component: MyProfileComponent },
      { path: 'learner', component: LearnerComponent },
      { path: 'trainer', component: TrainerComponent,canActivate:[TrainerGuardService] },
      { path: 'admin', component: AdminComponent,canActivate:[AdminGuardService]},
      { path: 'faqs', component: FaqComponent }
    ],
    canActivate: [AuthGuardService]
  },

  { path: "**", component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

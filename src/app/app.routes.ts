import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main/main-layout.component';
import { HomePageComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login/login.component';
import { NoHeaderLayoutComponent } from './layout/noheader-layout/noheader-layout.component';
import { RegisterPageComponent } from './pages/register/register.component';
import { BeachDetailPageComponent } from './pages/beachDetail/beach-detail.component';
import { ProfilePageComponent } from './pages/profile/profile.component';
import { RankingPageComponent } from './pages/ranking/ranking.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { OTPVerificationComponent } from './pages/otp-verification/otp-verification.component';
import { FavouritePageComponent } from './pages/favourites/favourite.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'favourites', component: FavouritePageComponent },
      { path: 'beach/:slug', component: BeachDetailPageComponent },
      { path: 'profile', component: ProfilePageComponent },
      { path: 'ranking', component: RankingPageComponent }, 
    ],
  },
  {
    path: '',
    component: NoHeaderLayoutComponent,
    children: [
      { path: 'register', component: RegisterPageComponent },
      { path: 'login', component: LoginPageComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'forgot-password/otp-verification', component: OTPVerificationComponent },
    ],
  }
];

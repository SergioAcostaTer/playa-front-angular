import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main/main-layout.component';
import { NoHeaderLayoutComponent } from './layout/noheader-layout/noheader-layout.component';
import { BeachDetailPageComponent } from './pages/beachDetail/beach-detail.component';
import { FavouritePageComponent } from './pages/favourites/favourite.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomePageComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login/login.component';
import { OTPVerificationComponent } from './pages/otp-verification/otp-verification.component';
import { ProfilePageComponent } from './pages/profile/profile.component';
import { RankingPageComponent } from './pages/ranking/ranking.component';
import { RankingPageByIslandComponent } from './pages/rankingByIsland/ranking.component';
import { RegisterPageComponent } from './pages/register/register.component';
import { SearchComponent } from './pages/search/search.component';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';
import {GeneralMapComponent} from './pages/general-map/general-map.component';

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
      { path: 'view-profile', component: ViewProfileComponent },
      { path: 'search', component: SearchComponent },
      { path: 'view-profile/:username', component: ViewProfileComponent },
      { path: 'ranking/:island', component: RankingPageByIslandComponent },
      { path: 'map', component: GeneralMapComponent }
    ],
  },
  {
    path: '',
    component: NoHeaderLayoutComponent,
    children: [
      { path: 'register', component: RegisterPageComponent },
      { path: 'login', component: LoginPageComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      {
        path: 'forgot-password/otp-verification',
        component: OTPVerificationComponent,
      },
    ],
  },
];

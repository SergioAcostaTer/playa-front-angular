import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login/login.component';
import { NoHeaderLayoutComponent } from './layout/noheader-layout/noheader-layout.component';
import { RegisterPageComponent } from './pages/register/register.component';
import { BeachDetailPageComponent } from './pages/beachDetail/beach-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'beach/:slug', component: BeachDetailPageComponent },
      {path: 'profile', component: ProfileComponent}
    ],
  },
  {
    path: '',
    component: NoHeaderLayoutComponent,
    children: [
      { path: 'register', component: RegisterPageComponent },
      { path: 'login', component: LoginPageComponent }
    ],
  },
  { path: '**', redirectTo: '/' },
];

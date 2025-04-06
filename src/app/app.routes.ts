import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main/main-layout.component';
import { NoHeaderLayoutComponent } from './layout/noheader-layout/noheader-layout.component';


export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./pages/pages.routes').then(m => m.default)
  },
  {
    path: 'auth',
    component: NoHeaderLayoutComponent,
    loadChildren: () =>
      import('./pages/auth/auth.routes').then(m => m.default)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

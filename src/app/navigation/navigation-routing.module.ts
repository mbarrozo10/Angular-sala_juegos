import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation.component';

const routes: Routes = [
    {path: '', component: NavigationComponent, children: [
      {path: '', loadChildren: () => import('../main/main.module').then(m => m.MainModule)},
      {path: 'main', loadChildren: () => import('../main/main.module').then(m => m.MainModule)},
      {path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)},
      {path: 'profile', loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule)},
      {path: 'yodesc', loadChildren: () => import('../yodesc/yodesc.module').then(m => m.YodescModule)}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }

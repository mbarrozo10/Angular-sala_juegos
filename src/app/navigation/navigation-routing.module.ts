import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  {path: '', redirectTo: 'navigation/main', pathMatch: 'full'},
    {path: '', component: NavigationComponent, children: [
      {path: 'main', loadChildren: () => import('../main/main.module').then(m => m.MainModule),...canActivate(() => redirectUnauthorizedTo(['/login']))},
      {path: 'yodesc', loadChildren: () => import('../yodesc/yodesc.module').then(m => m.YodescModule),...canActivate(() => redirectUnauthorizedTo(['/login']))}
    ]},
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }

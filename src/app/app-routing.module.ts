import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard'
const routes: Routes = [
  
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'registro', loadChildren: () => import('./registro/registro.module').then(m => m.RegistroModule)},
  // {path: 'navigation', component: NavigationComponent,children: 
  // [ {path: 'dashboard', component: DashboardComponent}, 
  //   {path: 'main', component: MainComponent}, 
  //   {path: 'profile', component: ProfileComponent} ],
  // ...canActivate(() => redirectUnauthorizedTo(['/login']))},
  // {path: 'yodesc', component: YodescComponent}
  {path: 'navigation', loadChildren: () => import('./navigation/navigation.module').then(m => m.NavigationModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

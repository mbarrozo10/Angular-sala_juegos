import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard'
const routes: Routes = [
  
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  // {path: 'navigation', component: NavigationComponent,children: 
  // [ {path: 'dashboard', component: DashboardComponent}, 
  //   {path: 'main', component: MainComponent}, 
  //   {path: 'profile', component: ProfileComponent} ],
  // ...canActivate(() => redirectUnauthorizedTo(['/login']))},
  // {path: 'yodesc', component: YodescComponent}
  {path: 'navigation', loadChildren: () => import('./navigation/navigation.module').then(mod => mod.NavigationModule), ...canActivate(() => redirectUnauthorizedTo(['/login']))}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

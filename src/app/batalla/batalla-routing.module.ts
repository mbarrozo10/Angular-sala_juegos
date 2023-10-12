import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatallaComponent } from './batalla.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
 { path: '' , component: BatallaComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatallaRoutingModule { }

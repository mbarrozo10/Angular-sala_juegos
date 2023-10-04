import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YodescComponent } from './yodesc.component';

const routes: Routes = [
  {path: '', component: YodescComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YodescRoutingModule { }

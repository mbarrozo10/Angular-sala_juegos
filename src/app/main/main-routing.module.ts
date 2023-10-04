import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {path: '', component : MainComponent, children: [
  {path: 'chat', loadChildren: () => import('../chat/chat.module').then(m => m.ChatModule)}
]}
,{path: 'ahorcado' , loadChildren: () => import('../ahorcado/ahorcado.module').then(m => m.AhorcadoModule)},
{path: 'mayor', loadChildren: () => import('../mayor-menor/mayor-menor.module').then(m => m.MayorMenorModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

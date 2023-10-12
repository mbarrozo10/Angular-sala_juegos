import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard'

const routes: Routes = [
  {path: '', component : MainComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])),children: [
  {path: 'chat', loadChildren: () => import('../chat/chat.module').then(m => m.ChatModule)}]
}
,{path: 'ahorcado' , loadChildren: () => import('../ahorcado/ahorcado.module').then(m => m.AhorcadoModule)},
{path: 'mayor', loadChildren: () => import('../mayor-menor/mayor-menor.module').then(m => m.MayorMenorModule)},
{path: 'preguntas', loadChildren: () => import('../preguntas/preguntas.module').then(m => m.PreguntasModule)},
{path: 'batalla', loadChildren: () => import('../batalla/batalla.module').then(m => m.BatallaModule)}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

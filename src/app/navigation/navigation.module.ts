import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationRoutingModule } from './navigation-routing.module';
import { FormsModule } from '@angular/forms';
import { YodescComponent } from '../yodesc/yodesc.component';
import { ChatComponent } from '../chat/chat.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [ YodescComponent,
    ],
  imports: [
    CommonModule,
    NavigationRoutingModule,
    FormsModule,MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatProgressBarModule,
  ]
})
export class NavigationModule { }

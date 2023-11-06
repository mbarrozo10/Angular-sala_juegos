import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChatRoutingModule } from './chat-routing.module';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChatRoutingModule,MatFormFieldModule,MatInputModule,

  ]
})
export class ChatModule { }

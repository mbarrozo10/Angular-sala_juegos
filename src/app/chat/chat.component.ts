import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['../bootstrap.min.css','./chat.component.scss']
})
export class ChatComponent implements OnInit {
  mostrar?: boolean;
  mensajes: any[] = [];
  estilo: any[] = [];
  retorno?: any;
    constructor(private chatService: ChatService, private userService: UserService,private rout: Router){}
    mensaje?: string;

    enviarMensaje(){
      if(this.mensaje !=undefined){
        console.log(this.mensaje);
      const usuario= this.userService.retornarUsuario() || "";
      this.chatService.addChatMessage(this.mensaje, usuario);
      this.mensaje = undefined;
      }
    }
    ngOnInit() : void{
      this.mostrar= true;
      this.retorno= this.chatService.ObternerMensajes();
      this.retorno.subscribe((message: any)=>{
        this.mensajes=[];
        message.forEach((message:any)=>
          this.mensajes.push(message));
          this.mensajes.sort((a,b) => a['id']-b['id']);
          this.estilo=[]
          this.mensajes.forEach((x)=>{
            if(x['usuario']==this.userService.retornarUsuario()){
              const datos= {
              div: "app-mensajes",
              clase:  "badge text-bg color"
              }
              this.estilo.push(datos);
            }else{
              const datos= {
                div: "app-mensajesL",
                clase:  "badge text-bg-success"
                }
                this.estilo.push(datos);
            }
           
        })
      })
  
    }
    @ViewChild('chatContainer') chatContainer?: any;

    scrollChatToBottom() {
      try {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      } catch (err) {
      }
    }

    ngOnDestroy() {
      this.retorno="";
    }
    ngAfterViewChecked() {
      this.scrollChatToBottom();
    }
    salir(){
      this.mostrar= false;
      this.rout.navigateByUrl("navigation")
    }
}

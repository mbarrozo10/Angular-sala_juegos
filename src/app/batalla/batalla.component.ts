import { Component, OnInit } from '@angular/core';
import { BatallacampoService } from '../services/batallacampo.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-batalla',
  templateUrl: './batalla.component.html',
  styleUrls: ['../bootstrap.min.css','./batalla.component.scss']
})
export class BatallaComponent implements OnInit {
  tabler:any[]=[];
  tabler2:any[]=[];
  jugador: any="";
  turno:any
  termino=false;
    constructor(private tablero: BatallacampoService, private auth: UserService){
      this.tablero.tableroUno.forEach((x:any) => x.forEach((y:any) => {
        if(y!='X1' && y!='X2' && y!='X3') 
        this.tabler.push({valor: y, usada:false, img:"../../assets/soltar.png"})
        else {switch(y){
          case 'X1':
            this.tabler.push({valor: y, usada:false, img:"../../assets/barco1.png"})
            break;
          case 'X2':
            this.tabler.push({valor: y, usada:false, img:"../../assets/barco2.png"})
            break;
          case 'X3':
            this.tabler.push({valor: y, usada:false, img:"../../assets/barco3.png"})
            break;
        }
        }
  }));
      this.tablero.tableroDos.forEach(x => x.forEach(y => {
        if(y!='X1' && y!='X2' && y!='X3') 
        this.tabler2.push({valor: y, usada:false, img:"../../assets/soltar.png"})
        else {switch(y){
          case 'X1':
            this.tabler2.push({valor: y, usada:false, img:"../../assets/barco1.png"})
            break;
          case 'X2':
            this.tabler2.push({valor: y, usada:false, img:"../../assets/barco2.png"})
            break;
          case 'X3':
            this.tabler2.push({valor: y, usada:false, img:"../../assets/barco3.png"})
            break;
        }
        }
      }));
    }
  ngOnInit(): void {
    this.jugador =this.auth.retornarUsuario();
    const x= this.auth.retornarUsuario()?.toString()
    if(x)
    this.tablero.actualizarJugadores(x);
    this.turno= this.auth.retornarUsuario()?.toString()
   
  }

  posicion:any;
  pegados:any[]=[]
  pegadosMaquina:any[]=[]
  juego=false;
  async jugar(valor:any){
    if(!this.termino){
     
    if(this.turno==this.auth.retornarUsuario()?.toString()){
      valor['usada']=true;
      valor['mostrar']=valor['valor']
      if(valor['valor']=='X1' || valor['valor']=='X2' || valor['valor']=='X3'){
        this.pegados.push(valor);
        Swal.fire({
          title: 'le pegaste'
        })
        this.juego=true;
        if(this.pegados.length==3){
          Swal.fire({
            title: 'hundiste mi acorazado'
          }).then(() => {
            Swal.fire({
              title: 'Termino la partida, Gano: ' + this.auth.retornarUsuario()
            })
          })
          this.termino=true;
        }
      }else{
        Swal.fire({
          title: 'Agua'
        })
        this.juego=false;
        this.turno="pc";
      }
    }
    if(!this.juego)
    this.juegaPC()}
  }

  seleccionar(valor:any){
    this.jugar(valor);
  }

  juegaPC(){
    setTimeout(() => {
      this.turno=this.auth.retornarUsuario();
      let salir=true;
      let x= Math.floor(Math.random() * this.tabler2.length)
      while(salir){
        if(this.tabler2[x]['usada']!=false){
          x= Math.floor(Math.random() * this.tabler2.length)
        }else{
          salir=false;
        }
      }
      this.tabler2[x]['usada']=true;
      this.tabler2[x]['mostrar']=this.tabler2[x]['valor'];
      if(this.tabler2[x]['valor']=='X1' || this.tabler2[x]['valor']=='X2' || this.tabler2[x]['valor']=='X3'){
        this.pegadosMaquina.push(this.tabler2[x]);
        Swal.fire({
          title: 'le pegaste'
        })
        this.juegaPC();
        if(this.pegadosMaquina.length==3){
          Swal.fire({
            title: 'hundiste mi acorazado'
          }).then(() => {
            Swal.fire({
              title: 'Termino la partida, Gano: PC'
            })
          })
          this.termino=true;
        }
      }else{
        Swal.fire({
          title: 'Agua'
        })
      }
    }
    , 2000);
  }
}

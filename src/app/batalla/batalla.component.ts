import { Component, OnInit } from '@angular/core';
import { BatallacampoService } from '../services/batallacampo.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  posicion:any;
  pegados:any[]=[]
  pegadosMaquina:any[]=[]
  juego=false;
  
    constructor(private tablero: BatallacampoService, private auth: UserService, private router: Router, private _snackBar: MatSnackBar){
      this.empezarJuego()
    }
    empezarJuego(){
      this.termino=false
      this.tabler =[]
      this.tabler2 =[]
      this.pegados =[]
      this.pegadosMaquina =[]
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


  async jugar(valor:any){
    if(!this.termino){
    if(this.turno==this.auth.retornarUsuario()?.toString()){
      valor['usada']=true;
      valor['mostrar']=valor['valor']
      if(valor['valor']=='X1' || valor['valor']=='X2' || valor['valor']=='X3'){
        this.pegados.push(valor);
        this.openSnackBar(this.turno +": Le pegaste!", "Cerrar")
        this.juego=true;
        if(this.pegados.length==3){
          this._snackBar.dismiss()
          Swal.fire({
            title: 'hundiste mi acorazado',
            heightAuto:false
          }).then(() => {
            this.finalizarJuego(this.auth.retornarUsuario()?.toString())
          })
          this.termino=true;
        }
      }else{
        this.openSnackBar(this.turno +": Agua!", "Cerrar")
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
      if(!this.termino) {
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
        this.openSnackBar(this.turno +": Le pegaste!", "Cerrar")
        this.juegaPC();
        if(this.pegadosMaquina.length==3){
          this._snackBar.dismiss()
          Swal.fire({
            title: 'Hundiste mi acorazado',
            heightAuto: false
          }).then(() => {
            this.finalizarJuego("PC")
          })
          this.termino=true;
        }
      }else{
        this.openSnackBar(this.turno +": Agua!", "Cerrar")
        this.turno=this.auth.retornarUsuario();
      }}
    }
    , 2000);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  finalizarJuego(ganador: any){
    Swal.fire({
      title: 'Termino la partida, Gano: '+ganador,
      heightAuto: false
    }).then(() => {
      Swal.fire({
        icon: 'info',
        text: 'Queres volver a jugar?',
        showCancelButton: true,
        confirmButtonText: 'Si!',
        cancelButtonText: "No.",
        heightAuto:false
      }).then((result) => {
        if(result.isConfirmed){
          this.tablero.reiniciarTableros();
          this.empezarJuego();
        }else{
          this.router.navigateByUrl('/navigation/main',{replaceUrl: true});
        }})})
  }
}

import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['../bootstrap.min.css','./ahorcado.component.scss']
})
export class AhorcadoComponent {
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  letrasd: string = 'abcdefghijklmnñopqrstuvwxyz';
  alfabeto: any[]=[];
  palabras: string[] = [
    'manzana',
    'banana',
    'pera',
    'sandia',
    'kiwi',
    'naranja',
    'fresa',
    'mango',
    'cereza',
  ];
  palabra= '';
  palabraEscondida='';
  vidas ='♥♥♥♥';
  private array:any[] = [];
  constructor(private router: Router, private userService: UserService){
    this.empezarJuego();
  }

  empezarJuego(){
    this.alfabeto = []
    for (const letra of this.letrasd) {
      this.alfabeto.push({ letra: letra, usada: false });
    }
    this.palabra= this.palabras[Math.floor(Math.random() * this.palabras.length)]
    this.array = this.palabra.split('');
    const test= [];
    for(let i=0;i<this.array.length;i++){
      if(i==0 || i==this.array.length-1){
        test[i]= this.array[i];
      }else{
        test[i]= '_';
      }
    }
    this.palabraEscondida= test.join('');
  }

  mostrarLetraEnConsola(letra: any) {
    const array=this.vidas.split('');
    const test=this.palabraEscondida.split('');
    if(!this.array.includes(letra['letra'])){
      array.pop();
      if(array.length==0){
        Swal.fire({
          icon: 'error',
          title: 'Perdiste :(',
          text: 'Queres volver a jugar?',
          showCancelButton: true,
          confirmButtonText: 'Si!',
          cancelButtonText: "No."
        }).then((result) => {
          if(result.isConfirmed){
            this.empezarJuego();
          }else{
            this.router.navigateByUrl('/navigation/main',{replaceUrl: true});

          }})
        this.userService.GuardarPartidaAhorcado(false);
      }
    }else{
      for(let i=0;i<this.array.length;i++){
        if(letra['letra']== this.array[i]){
          test[i]= this.array[i];
        }
      }
      this.palabraEscondida = test.join('');
      if(this.palabraEscondida=== this.palabra){
        this.userService.GuardarPartidaAhorcado(true);
        Swal.fire({
          imageUrl: "../assets/cele.gif",
          title: 'Bien!  Ganaste :D',
          text: 'Queres volver a jugar?',
          showCancelButton: true,
          confirmButtonText: 'Si!',
          cancelButtonText: "No."
        }).then((result) => {
          if(result.isConfirmed){
            this.empezarJuego();
          }else{
            this.router.navigateByUrl('/navigation/main',{replaceUrl: true});
          }
        })
        
      }
    }
    letra['usada']=true;
    this.vidas= array.join('');
  }
}

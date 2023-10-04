import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['../bootstrap.min.css','./ahorcado.component.scss']
})
export class AhorcadoComponent {
  usadas='';
  alfabeto: string[] = 'abcdefghijklmnñopqrstuvwxyz'.split('');
  palabras: string[] = [
    'manzana',
    'banana',
    'pera',
    'sandía',
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

  mostrarLetraEnConsola(letra: string) {
    const array=this.vidas.split('');
    const test=this.palabraEscondida.split('');
    if(!this.array.includes(letra)){
      array.pop();
      if(array.length==0){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Perdiste :(',
        })
        this.userService.GuardarPartidaAhorcado(false);
        this.router.navigateByUrl('/navigation/main',{replaceUrl: true});
      }
    }else{
      for(let i=0;i<this.array.length;i++){
        if(letra== this.array[i]){
          test[i]= this.array[i];
        }
      }
      this.palabraEscondida = test.join('');
      if(this.palabraEscondida=== this.palabra){
        Swal.fire({
          imageUrl: "../assets/cele.gif",
          title: 'Bien!',
          text: 'Ganaste :D',
        })
        this.userService.GuardarPartidaAhorcado(true);
        this.router.navigateByUrl('/navigation/main',{replaceUrl: true});
      }
    }
    this.usadas+=letra;
    this.vidas= array.join('');
  }
}

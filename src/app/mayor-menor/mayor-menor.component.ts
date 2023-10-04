import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['../bootstrap.min.css','./mayor-menor.component.scss']
})
export class MayorMenorComponent {
  cantidad=0;
  carta="";
  puntos=0;
  private cartas: Array<number>=[
    1,2,3,4,5,6,7,8,9,10,11,12
  ]

  constructor(private userService: UserService, private router: Router){
    Swal.fire({
      icon: "info",
      title: 'Bienvenido!',
      text: 'El juego consite en adivinar si la siguiente carta es mayo o menor a la que esta en pantalla, solo hay 10 turnos!',
    })
    this.carta= this.cartas[Math.floor(Math.random() * this.cartas.length)].toString();
  }
  verificar(letras: string){
    let noEsIgual: Boolean= true;
    let nuevaCarta: number=0;
    while (noEsIgual) { 
      nuevaCarta=this.cartas[Math.floor(Math.random() * this.cartas.length)];
      if(nuevaCarta.toString()!=this.carta){
        noEsIgual=false;
      }
    }
    if(letras=="m" && nuevaCarta > parseInt(this.carta)){
        this.puntos+=1;
    }else if(letras=="n" && nuevaCarta < parseInt(this.carta)){
      this.puntos+=1;
    } 
    this.cantidad+=10;
    this.carta=nuevaCarta.toString();
    if(this.cantidad==100){
      Swal.fire({
        icon: "info",
        title: 'Termino',
        text: 'Obtuviste: ' + this.puntos,
      });
      this.userService.GuardarPartidaMayor(this.puntos);
      this.router.navigateByUrl('/navigation/main',{replaceUrl: true} );
    }
  }
}

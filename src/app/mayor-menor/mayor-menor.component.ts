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
  carta: any;
  puntos=0;
  private cartas: any[]=[
    {numero: 1, valor:"1 Espada"}, {numero:2 , valor:"2 Espada"}, {numero: 3 , valor:"3 Espada"}, {numero: 4 , valor:"4 Espada"}, {numero: 5 , valor:"5 Espada"}, {numero:6 , valor:"6 Espada"} , 
    {numero: 7, valor:"7 Espada"} , {numero: 8, valor:"8 Espada"}, {numero: 9, valor:"9 Espada"}, {numero:10, valor:"10 Espada"},{numero:11, valor: "11 Espada"}, 
    {numero: 12, valor:"12 Espada"},
    {numero: 1, valor:"1 Basto"}, {numero:2 , valor:"2 Basto"}, {numero: 3 , valor:"3 Basto"}, {numero: 4 , valor:"4 Basto"}, {numero: 5 , valor:"5 Basto"}, {numero:6 , valor:"6 Basto"} , 
    {numero: 7, valor:"7 Basto"} , {numero: 8, valor:"8 Basto"}, {numero: 9, valor:"9 Basto"}, {numero:10, valor:"10 Basto"},{numero:11, valor: "11 Basto"}, 
    {numero: 12, valor:"12 Basto"}, 
    {numero: 1, valor:"1 Oro"}, {numero:2 , valor:"2 Oro"}, {numero: 3 , valor:"3 Oro"}, {numero: 4 , valor:"4 Oro"}, {numero: 5 , valor:"5 Oro"}, {numero:6 , valor:"6 Oro"} , 
    {numero: 7, valor:"7 Oro"} , {numero: 8, valor:"8 Oro"}, {numero: 9, valor:"9 Oro"}, {numero:10, valor:"10 Oro"},{numero:11, valor: "11 Oro"}, 
    {numero: 12, valor:"12 Oro"},
    {numero: 1, valor:"1 Copa"}, {numero:2 , valor:"2 Copa"}, {numero: 3 , valor:"3 Copa"}, {numero: 4 , valor:"4 Copa"}, {numero: 5 , valor:"5 Copa"}, {numero:6 , valor:"6 Copa"} , 
    {numero: 7, valor:"7 Copa"} , {numero: 8, valor:"8 Copa"}, {numero: 9, valor:"9 Copa"}, {numero:10, valor:"10 Copa"},{numero:11, valor: "11 Copa"}, 
    {numero: 12, valor:"12 Copa"}
  ]

  constructor(private userService: UserService, private router: Router){
    Swal.fire({
      icon: "info",
      title: 'Bienvenido!',
      text: 'El juego consite en adivinar si la siguiente carta es mayo o menor a la que esta en pantalla, solo hay 10 turnos!',
    })
    this.carta= this.cartas[Math.floor(Math.random() * this.cartas.length)];
  }
  verificar(letras: string){
    let noEsIgual: Boolean= true;
    let nuevaCarta: any="0";
    while (noEsIgual) { 
      nuevaCarta=this.cartas[Math.floor(Math.random() * this.cartas.length)];
      if(nuevaCarta['numero']!=this.carta['numero'] && nuevaCarta['valor']!= this.carta['valor']){
        noEsIgual=false;
      }
    }
    if(letras=="m" && nuevaCarta['numero'] > this.carta['numero']){
        this.puntos+=1;
    }else if(letras=="n" && nuevaCarta['numero'] < this.carta['numero']){
      this.puntos+=1;
    } 
    this.cantidad+=10;
    this.carta=nuevaCarta;
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

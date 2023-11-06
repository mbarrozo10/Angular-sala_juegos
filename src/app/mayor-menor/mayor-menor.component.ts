import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['../bootstrap.min.css','./mayor-menor.component.scss']
})

export class MayorMenorComponent {
  cantidad=0;
  carta: any;
  puntos=0;
  ultima="../../assets/cartas/back.png";
  actual="../../assets/cartas/back.png";
  cartas:any[] = [];
  constructor(private userService: UserService, private router: Router, private _snackBar: MatSnackBar){
    Swal.fire({
      icon: "info",
      title: 'Bienvenido!',
      text: 'El juego consite en adivinar si la siguiente carta es mayo o menor a la que esta en pantalla, solo hay 10 turnos!',
      heightAuto:false
    })
    this.empezarJuego()
  }

  empezarJuego(){
    this.puntos=0;
    this.cantidad=0;
    this.cartas=[]
    this.cartasSinTocar.forEach(x => this.cartas.push(x));
    this.carta= this.cartas[Math.floor(Math.random() * this.cartas.length)];
    this.ultima= this.carta['img']
  }
  verificar(letras: string){
    // this.ultima= this.carta['img']
    let textoFinal=""
    let noEsIgual: Boolean= true;
    let nuevaCarta: any="0";
    console.log(this.cartas);
    while (noEsIgual) {  //investigar funciones de js para igualdad 
      nuevaCarta=this.cartas[Math.floor(Math.random() * this.cartas.length)];
      if(nuevaCarta['numero']!=this.carta['numero'] && nuevaCarta['valor']!= this.carta['valor']){
        noEsIgual=false;
        console.log(nuevaCarta);
        this.cartas.splice(this.cartas.indexOf(nuevaCarta),1)
        console.log(this.cartas);
        console.log(this.cartasSinTocar)
      }
    }
    if(letras=="m" && nuevaCarta['numero'] > this.carta['numero']){
        this.puntos+=1;
        this.openSnackBar("Adivinaste!","Cerrar")
    }else if(letras=="n" && nuevaCarta['numero'] < this.carta['numero']){
      this.openSnackBar("Adivinaste!","Cerrar")
      this.puntos+=1;
    } else{
      this.openSnackBar("Te equivocaste!","Cerrar")
    }
    this.cantidad+=10;
    this.carta=nuevaCarta;
    this.ultima=this.carta['img']
    if(this.cantidad==100){
      this._snackBar.dismiss()
      if(this.puntos> 5){
        textoFinal= "Termino, Ganaste!"
      }else{
        textoFinal= "Termino, Perdiste!"
      }
      Swal.fire({
        icon: "info",
        title: textoFinal,
        text: 'Obtuviste: ' + this.puntos,
        heightAuto:false

      }).then(() =>{;
      Swal.fire({
        icon: 'info',
        text: 'Queres volver a jugar?',
        showCancelButton: true,
        confirmButtonText: 'Si!',
        cancelButtonText: "No.",
        heightAuto:false
      }).then((result) => {
        if(result.isConfirmed){
          this.empezarJuego();
        }else{
          this.router.navigateByUrl('/navigation/main',{replaceUrl: true});
        }})})
      this.userService.GuardarPartidaMayor(this.puntos);
      // this.router.navigateByUrl('/navigation/main',{replaceUrl: true} );
    }
  }


  private cartasSinTocar: any[]=[
    { numero: 1, valor: "1 Espada", img: "../../assets/cartas/espada/1.jpeg" },
  { numero: 2, valor: "2 Espada", img: "../../assets/cartas/espada/2.jpeg" },
  { numero: 3, valor: "3 Espada", img: "../../assets/cartas/espada/3.jpeg" },
  { numero: 4, valor: "4 Espada", img: "../../assets/cartas/espada/4.jpeg" },
  { numero: 5, valor: "5 Espada", img: "../../assets/cartas/espada/5.jpeg" },
  { numero: 6, valor: "6 Espada", img: "../../assets/cartas/espada/6.jpeg" },
  { numero: 7, valor: "7 Espada", img: "../../assets/cartas/espada/7.jpeg" },

  { numero: 10, valor: "10 Espada", img: "../../assets/cartas/espada/10.jpeg" },
  { numero: 11, valor: "11 Espada", img: "../../assets/cartas/espada/11.jpeg" },
  { numero: 12, valor: "12 Espada", img: "../../assets/cartas/espada/12.jpeg" },
  { numero: 1, valor: "1 Basto", img: "../../assets/cartas/basto/1.jpeg" },
  { numero: 2, valor: "2 Basto", img: "../../assets/cartas/basto/2.jpeg" },
  { numero: 3, valor: "3 Basto", img: "../../assets/cartas/basto/3.jpeg" },
  { numero: 4, valor: "4 Basto", img: "../../assets/cartas/basto/4.jpeg" },
  { numero: 5, valor: "5 Basto", img: "../../assets/cartas/basto/5.jpeg" },
  { numero: 6, valor: "6 Basto", img: "../../assets/cartas/basto/6.jpeg" },
  { numero: 7, valor: "7 Basto", img: "../../assets/cartas/basto/7.jpeg" },

  { numero: 10, valor: "10 Basto", img: "../../assets/cartas/basto/10.jpeg" },
  { numero: 11, valor: "11 Basto", img: "../../assets/cartas/basto/11.jpeg" },
  { numero: 12, valor: "12 Basto", img: "../../assets/cartas/basto/12.jpeg" },
  { numero: 1, valor: "1 Oro", img: "../../assets/cartas/oro/1.jpeg" },
  { numero: 2, valor: "2 Oro", img: "../../assets/cartas/oro/2.jpeg" },
  { numero: 3, valor: "3 Oro", img: "../../assets/cartas/oro/3.jpeg" },
  { numero: 4, valor: "4 Oro", img: "../../assets/cartas/oro/4.jpeg" },
  { numero: 5, valor: "5 Oro", img: "../../assets/cartas/oro/5.jpeg" },
  { numero: 6, valor: "6 Oro", img: "../../assets/cartas/oro/6.jpeg" },
  { numero: 7, valor: "7 Oro", img: "../../assets/cartas/oro/7.jpeg" },

  { numero: 10, valor: "10 Oro", img: "../../assets/cartas/oro/10.jpeg" },
  { numero: 11, valor: "11 Oro", img: "../../assets/cartas/oro/11.jpeg" },
  { numero: 12, valor: "12 Oro", img: "../../assets/cartas/oro/12.jpeg" },
  { numero: 1, valor: "1 Copa", img: "../../assets/cartas/copa/1.jpeg" },
  { numero: 2, valor: "2 Copa", img: "../../assets/cartas/copa/2.jpeg" },
  { numero: 3, valor: "3 Copa", img: "../../assets/cartas/copa/3.jpeg" },
  { numero: 4, valor: "4 Copa", img: "../../assets/cartas/copa/4.jpeg" },
  { numero: 5, valor: "5 Copa", img: "../../assets/cartas/copa/5.jpeg" },
  { numero: 6, valor: "6 Copa", img: "../../assets/cartas/copa/6.jpeg" },
  { numero: 7, valor: "7 Copa", img: "../../assets/cartas/copa/7.jpeg" },
  { numero: 10, valor: "10 Copa", img: "../../assets/cartas/copa/10.jpeg" },
  { numero: 11, valor: "11 Copa", img: "../../assets/cartas/copa/11.jpeg" },
  { numero: 12, valor: "12 Copa", img: "../../assets/cartas/copa/12.jpeg" }
  ]

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}


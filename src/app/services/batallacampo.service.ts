import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BatallacampoService {
  public tableroUno: any =[
    ['a1', 'a2', 'a3', 'a4', 'a5'],
    ['b1', 'b2', 'b3', 'b4', 'b5'],
    ['c1', 'c2', 'c3', 'c4','c5'],
    ['d1', 'd2', 'd3', 'd4', 'd5'],
    ['e1', 'e2', 'e3', 'e4','e5'],
  ]
  public tableroDos=[
    ['a1', 'a2', 'a3', 'a4', 'a5'],
    ['b1', 'b2', 'b3', 'b4', 'b5'],
    ['c1', 'c2', 'c3', 'c4','c5'],
    ['d1', 'd2', 'd3', 'd4', 'd5'],
    ['e1', 'e2', 'e3', 'e4','e5'],
  ]
  private jugadoresSubject= new BehaviorSubject<string>('');
  jugadores$ = this.jugadoresSubject.asObservable();
  constructor() {
    this.AsignarBarcos(this.tableroUno);
    this.AsignarBarcos(this.tableroDos);
   }

   AsignarBarcos(array:any[][]){
    let salir=true;
    while(salir){
    const indiceFilaAleatorio = Math.floor(Math.random() * array.length);
    const indiceColumnaAleatorio = Math.floor(Math.random() * array[0].length);
    const arrayParaUbicar: any[] = ['X1', 'X2', 'X3'];

    for(let i =0 ; i < 3 ; i++) {
      if(indiceColumnaAleatorio<3)
      {array[indiceFilaAleatorio][indiceColumnaAleatorio+i] = arrayParaUbicar[i];
      salir=false;}
      else if(indiceFilaAleatorio < 3)
      {array[indiceFilaAleatorio+i][indiceColumnaAleatorio] = arrayParaUbicar[i];
      salir=false}
    }
    const arrayEnUbicacionAleatoria = this.tableroUno[indiceFilaAleatorio][indiceColumnaAleatorio];
  }
   }

   actualizarJugadores(nuevosJugadores: string) {
    this.jugadoresSubject.next(nuevosJugadores);
  }
}

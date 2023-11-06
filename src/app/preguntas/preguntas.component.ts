import {
  Component,
  OnInit,
} from "@angular/core";
import { BanderasService } from "../services/banderas-service.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss']
})
export class PreguntasComponent implements OnInit {
  constructor(private banderas: BanderasService, private router: Router, private _snackBar: MatSnackBar){
  }
  paises:any[]=[]
  pais:any;
  rtas=['1', '2', '3', '4'];
  contador:number=1;
  acertadas:number=0;

  ngOnInit(): void {
    this.obtenerPaises().then(() => {
    })

  }

  async obtenerPaises(){
    this.banderas.RetornarTodos().subscribe(data =>{
      this.paises=data;
      console.log(this.paises)
      this.elegirPreguntas()
    });
  }
  
  elegirPreguntas(){
    const pais= this.paises[Math.floor(Math.random() * this.paises.length)]
    console.log(this.paises)
    const indexof=this.paises.indexOf(pais)
    this.paises.splice(indexof,1)
    console.log(pais);
    this.pais={
      nombre: pais.name.common,
      img: pais.flags.png
    }
    this.rtas=[]
    for(let i=0; i<4; i++) {
      const x= this.paises[Math.floor(Math.random() * this.paises.length)].name.common;
      console.log(x);
      this.rtas.push(x)
      console.log(this.rtas)
    }
    this.rtas[Math.floor(Math.random() * this.rtas.length)]= this.pais.nombre;
    
  }

  Verificar(numero: number){
    if(this.rtas[numero] === this.pais.nombre){
      this.openSnackBar("Adivinaste!","Cerrar")
      this.acertadas++;
    }else{
      this.openSnackBar("Te equivocaste!","Cerrar")
    }
    this.contador++;
    if(this.contador==10){
      this._snackBar.dismiss()
      let text;
      if(this.acertadas > 5) text="Ganaste!"
      else text="Perdiste!"
      Swal.fire({
        title: text,
        heightAuto:false
      }).then(() =>
      Swal.fire({
        title: "Se termino el juego!" + " Las preguntas acertadas son: "  + this.acertadas,
        text:"Queres Volver a Jugar?",
        showCancelButton: true,
        confirmButtonText: 'Si!',
        cancelButtonText: "No.",
        heightAuto: false
      }).then((result) => {
        if(result.isConfirmed){
          this.obtenerPaises()
          this.contador=1;
          this.acertadas=0;
        }else{
          this.router.navigateByUrl('/navigation/main',{replaceUrl: true});

        }}))
      }
    this.elegirPreguntas();

  }

  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  
}

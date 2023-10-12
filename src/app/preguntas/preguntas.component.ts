import {
  Component,
  OnInit,
} from "@angular/core";
import { BanderasService } from "../services/banderas-service.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss']
})
export class PreguntasComponent implements OnInit {
  constructor(private banderas: BanderasService, private router: Router){
    
  }
  paises:any[]=[]
  pais:any;
  rtas=['1', '2', '3', '4'];
  contador:number=1;
  acertadas:number=0;

  ngOnInit(): void {
    this.banderas.RetornarTodos().subscribe(data =>{
      this.paises=data;
      console.log(this.paises)
      this.elegirPreguntas()
    });
  }
  
  elegirPreguntas(){
    const pais= this.paises[Math.floor(Math.random() * this.paises.length)]
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
      Swal.fire({
        title: "La pegaste!!"
      })
      this.acertadas++;
    }else{
      Swal.fire({
        title: "Te equivocaste"
      })
    }
    this.contador++;
    if(this.contador==10){
      Swal.fire({
        title: "Se termino el juego!" + "Las preguntas acertadas son:"  + this.acertadas,
        text:"Queres Volver a Jugar?",
        showCancelButton: true,
        confirmButtonText: 'Si!',
        cancelButtonText: "No."
      }).then((result) => {
        if(result.isConfirmed){
          this.elegirPreguntas();
          this.contador=1;
          this.acertadas=0;
        }else{
          this.router.navigateByUrl('/navigation/main',{replaceUrl: true});

        }})
      }
    this.elegirPreguntas();

  }
  
}

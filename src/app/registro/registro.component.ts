import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import LogI from '../model/logI';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss', '../bootstrap.min.css']
})
export class RegistroComponent implements OnInit {
  email!: any;
  password!: any;
  usuario!: any;

  constructor(private userService : UserService, private router: Router){
    
  }

   register (){
   
        // const user=  this.userService.register(this.email, this.password, this.usuario);
        // console.log(user);
        // if(user != "errorMail" && user != "false"&& user != undefined){
          // console.log(user);
          try {
          this.userService.register(this.email, this.password,this.usuario )
          .then((response : any) => {
            const log : LogI={
              email: this.email,
              fecha: new Date()
            }
            const result = this.userService.registrarLog(log);
            Swal.fire({
              icon: 'success',
              title: 'Excelente!',
              text: 'Tu registro quedo guardado!',
            })
            this.router.navigateByUrl('/navigation',{replaceUrl: true});
          }).catch((error: Error) => {
            console.log("llegue: ",error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo esta mal!',
            })
          });
        }catch(err){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Te falto algo!',
          })
        }
  }

  ngOnInit(): void{

  }

}

import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import LogI from '../model/logI';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
  './login.component.scss']
})
export class LoginComponent {
  email!: string ;
  password!: string ;
  constructor(private userService: UserService, private router : Router) {
  }

  Autocompletar(){
      this.email = "lupin@elgato.com";
      this.password = "hola123";
  }

  async login(){
    try{
      const user= await this.userService.login(this.email, this.password);
      const log : LogI={
        email: this.email,
        fecha: new Date()
      }
      const result = await this.userService.registrarLog(log);
      this.router.navigateByUrl('/navigation',{replaceUrl: true});
    }
    catch(error){
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Te falto algo!',
      })
    }
        
  }
}

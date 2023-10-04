import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserI } from '../model/userI';
import { Router } from '@angular/router';
import { FileI } from '../model/fileI';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public image! : FileI;
  public currentImage = "https://firebasestorage.googleapis.com/v0/b/tplab4-e268a.appspot.com/o/profile.jpg?alt=media&token=53263777-460b-406c-8aae-efeea80d3c1c";
  usuario!: string;
  photo!: string;
  constructor(private userService: UserService, private router : Router) {}
  GuardarUsuario(){
    const foto= this.userService.VerificarFoto();
    if(foto){
      this.photo= foto;
    }
    
    const user : UserI ={
      email  : " ",
      password  : " ",
      displayName : this.usuario,
      photoUrl : this.photo
    } 
    // this.userService.UpdateUsuario(user, this.image);
    this.userService.PreUpdateUsuario(user, this.image);

    // this.router.navigateByUrl('/navigation', {replaceUrl: true});
    location.reload();
  }

  handleImage(event: any): void{
    try{
      const files = event.target.files;
      this.image= files[0];
    }catch(err){
      console.log(err);
    }
    
  }
}

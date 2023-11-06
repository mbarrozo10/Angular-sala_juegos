import { Component } from '@angular/core';

@Component({
  selector: 'app-yodesc',
  templateUrl: './yodesc.component.html',
  styleUrls: ['./yodesc.component.scss']
})
export class YodescComponent {
  fondo:any="profile-card"


  cambiar(){
    if(this.fondo=="profile-card"){
      this.fondo = "profile-cardDark"
    }else{
      this.fondo = "profile-card"
    }
  }
}

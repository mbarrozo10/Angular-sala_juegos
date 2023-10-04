import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(){}
  private breakpoints = inject(BreakpointObserver);
  cards = this.breakpoints.observe(Breakpoints.Handset).pipe(
    map(({matches})=> {
      if(matches){[
        {title: 'Chat', cols:1, rows: 1},
        {title: 'Ahoracado', cols:1, rows:1}
      ]
      }
      return [
        {title: 'Chat', cols:1, rows:1},
        {title: 'Ahoracado', cols:1, rows:1}
      ]
    })
  );

  
}

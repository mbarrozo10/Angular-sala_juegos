import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BanderasService {
  api: string='https://restcountries.com/v3.1/';
  constructor(private http : HttpClient) { }


  RetornarTodos(): Observable<any> {
    return this.http.get(this.api+ 'all');
  }

  RetornarUno(nombre: string): Observable<any> {
    return this.http.get(this.api+ 'name/' + nombre);
  }
}

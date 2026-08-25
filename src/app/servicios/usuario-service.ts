import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../clases/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public httClient: HttpClient) {

  }

  validarUsuario(usuario: User) {
    return this.httClient.get('http://localhost:3000/usuario/');

  }

  crearUsuario(usuario: User) {
    return this.httClient.post('http://localhost:3000/usuario/',
      { usuario });
  }
}

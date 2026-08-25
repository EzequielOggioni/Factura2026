import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsError } from "../../forms-error/forms-error";
import { UsuarioService } from '../../servicios/usuario-service';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const googleProvider = new GoogleAuthProvider();


@Component({
  selector: 'app-registro',
  imports: [CommonModule, ReactiveFormsModule, FormsError],
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
})
export class Registro {
  public activeLogin: boolean = true;
  public registroForm!: FormGroup;
  /**
   *
   */
  constructor(public fb: FormBuilder, public usuarioService: UsuarioService) {
  }

  ngOnInit(): void {

    this.registroForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }


  onSubmit() {


    this.usuarioService.validarUsuario(this.registroForm.value).subscribe(
      (response) => {
        console.log('Usuario registrado con éxito', response);
      }
    );
  }

  limpiar() {
    this.registroForm.reset();

  }

  

}
  

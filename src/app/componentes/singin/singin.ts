import { CommonModule } from '@angular/common';
import { Component, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp } from '@firebase/app';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { UsuarioService } from '../../servicios/usuario-service';

@Component({
  selector: 'app-singin',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './singin.html',
  styleUrl: './singin.scss',
})
export class Singin {
  public email: string = '';
  public password: string = '';
  public username: string = '';
  public uuid: string = '';
  public foto: WritableSignal<string | null> = signal<string | null>(null);


  public firebaseConfig = {
    apiKey: "AIzaSyAgSPd27boYs6ESA48XmWnFWEi-w-FTb5M",
    authDomain: "beltran-e130d.firebaseapp.com",
    projectId: "beltran-e130d",
    storageBucket: "beltran-e130d.firebasestorage.app",
    messagingSenderId: "418836104952",
    appId: "1:418836104952:web:65967f6e0c6d1a63a51d0d",
    measurementId: "G-PWQJTKJQC1"
  };

  constructor(public usersrv: UsuarioService) {
  }

  registrarseConMail() {
    const app = initializeApp(this.firebaseConfig);
    const auth = getAuth(app);

    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        this.uuid = user.uid;
        console.info("Usuario registrado con éxito", user);
        this.usersrv.crearUsuario({
          username: this.username,
          email: this.email,
          foto: this.foto() || '',
          id: this.uuid,
        }).subscribe({ next: (response) => {
          console.log('Usuario creado en la base de datos con éxito', response);
        }, error: (error) => {
          console.error("Error al crear usuario en la base de datos", error);
        }});
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error al registrar usuario", errorMessage);
        // ..
      });
  }

  conectarConGoogle() {
    const app = initializeApp(this.firebaseConfig);
    let googleAuthProvider = new GoogleAuthProvider();
    const auth = getAuth(app);
    signInWithPopup(auth, googleAuthProvider).then((result) => {
      let credential = GoogleAuthProvider.credentialFromResult(result);
      console.info(credential);
      console.info(result);
      this.username = result.user.displayName || '';
      this.email = result.user.email || '';
      this.uuid = result.user.uid || '';
      this.foto.set(result.user.photoURL || '');
      
      this.usersrv.crearUsuario({
        username: this.username,
        email: this.email,
        foto: this.foto() || '',
        id: this.uuid,
      }).subscribe({ next: (response) => {
        console.log('Usuario creado en la base de datos con éxito', response);
      }, error: (error) => {
        console.error("Error al crear usuario en la base de datos", error);
      } });
    });
  }

  public Subirfoto(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    console.info("Subirfoto", file);
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      console.info("Subirfoto", reader.result);
      this.foto.set(reader.result as string);
    };
    console.info("Subirfoto", file);
    reader.readAsDataURL(file);


  }
}

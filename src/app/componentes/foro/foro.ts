import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, query, orderBy, Unsubscribe, onSnapshot } from "firebase/firestore";

@Component({
  selector: 'app-foro',
  imports: [CommonModule, FormsModule],
  templateUrl: './foro.html',
  styleUrl: './foro.scss',
})
export class Foro implements OnInit, OnDestroy {

  public mensajeForo: mensajeForo = {
    categoria: '',
    nombreUsuario: '',
    mensaje: '',
    fecha: new Date()
  } as unknown as mensajeForo;
 
  public mensajesForo: WritableSignal<mensajeForo[]> = signal<mensajeForo[]>([]);

  private unsubscribe: Unsubscribe | null = null;

  public firebaseConfig = {
    apiKey: "AIzaSyAgSPd27boYs6ESA48XmWnFWEi-w-FTb5M",
    authDomain: "beltran-e130d.firebaseapp.com",
    projectId: "beltran-e130d",
    storageBucket: "beltran-e130d.firebasestorage.app",
    messagingSenderId: "418836104952",
    appId: "1:418836104952:web:65967f6e0c6d1a63a51d0d",
    measurementId: "G-PWQJTKJQC1"
  };

  /**
   *
   */
  constructor() {

  }

  ngOnInit(): void {

    this.unsubscribe = onSnapshot(query(collection(this.db, 'MensajesForo'), orderBy('Fecha', 'desc'))
    , (datos: any) => {
      this.mensajesForo.set(datos.docs.map((docSnap: any) => {
        const data = docSnap.data() as any;
        return {
          id: docSnap.id,
          ...data,
          Fecha: data.Fecha?.toDate ? data.Fecha.toDate() : data.Fecha,
        } as mensajeForo;
      }));
    });


  }
  // Initialize Firebase
  public app = initializeApp(this.firebaseConfig);
  public db = getFirestore(this.app);

  public async enviar() {
    if (this.mensajeForo) {
      try {
        this.mensajeForo.Fecha = new Date();
        let docRef = await addDoc(collection(this.db, "MensajesForo"), this.mensajeForo);
        this.mensajeForo = {
          Categoria: '',
          Usuario: '',
          Mensaje: '',
          Fecha: new Date()
        } as unknown as mensajeForo;
      } catch (e) {
        console.error("Error adding document: ", e);
      }

    } else {
      console.error("No hay mensaje para enviar.");
    }

  }

  ngOnDestroy(): void {
    this.unsubscribe?.();
  }

}

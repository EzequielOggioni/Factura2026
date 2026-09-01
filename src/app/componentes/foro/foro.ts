import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, query, orderBy, Unsubscribe, onSnapshot, deleteDoc, getDoc, where, getDocs, doc, DocumentReference, updateDoc } from "firebase/firestore";
import firebaseConfig from '../../JSON/firebaseConfig.json';

@Component({
  selector: 'app-foro',
  imports: [CommonModule, FormsModule],
  templateUrl: './foro.html',
  styleUrl: './foro.scss',
})
export class Foro implements OnInit, OnDestroy {

  public app = initializeApp(firebaseConfig);
  public db = getFirestore(this.app);

  public mensajeForo: mensajeForo = {
    Categoria: '',
    Usuario: '',
    Mensaje: '',
    Fecha: new Date()
  } as unknown as mensajeForo;

  private docRefModifica: DocumentReference | null = null;
  public modificando: WritableSignal<boolean> = signal(false);
  
  public mensajesForo: WritableSignal<mensajeForo[]> = signal<mensajeForo[]>([]);

  private unsubscribe: Unsubscribe | null = null;

  ngOnInit(): void {

    this.unsubscribe = onSnapshot(query(collection(this.db, 'MensajesForo'),
      where('Fecha', '>=', new Date(new Date().setDate(new Date().getDate() - 90))), 
      orderBy('Fecha', 'desc')), (datos) => {
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
 
  public async enviar() {
    if (this.mensajeForo) {
      try {
        this.mensajeForo.Fecha = new Date();
        let docRef = await addDoc(collection(this.db, "MensajesForo"), this.mensajeForo);
        docRef.id
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

  public borrar(id: string) {
    let docRef = doc(this.db, "MensajesForo", id);
    if (docRef) {
      deleteDoc(docRef).then(() => {
        console.log("Documento eliminado con éxito");
      }).catch((error) => {
        console.error("Error al eliminar el documento: ", error);
      });
    }
  }

  modifica(id: string) {
    this.docRefModifica = doc(this.db, "MensajesForo", id);
    this.mensajeForo = { ...this.mensajesForo().filter(m => m.id == id)[0] };
    this.modificando.set(true);
  }

  modificar() {
    updateDoc(this.docRefModifica!, { ...this.mensajeForo, FechaModificacion: new Date() }).then(() => {
      this.modificando.set(false);
    }).catch((error) => {
      this.modificando.set(false);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe?.();
  }

}

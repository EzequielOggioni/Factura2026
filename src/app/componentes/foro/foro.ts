import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, query, orderBy, Unsubscribe, onSnapshot, deleteDoc, getDoc, where, getDocs, doc, DocumentReference, updateDoc } from "firebase/firestore";
import firebaseConfig from '../../JSON/firebaseConfig.json';
import chartjs from 'chart.js/auto';

@Component({
  selector: 'app-foro',
  imports: [CommonModule, FormsModule],
  templateUrl: './foro.html',
  styleUrl: './foro.scss',
  providers: [DatePipe]
})
export class Foro implements OnInit, OnDestroy {

  public app = initializeApp(firebaseConfig);
  public db = getFirestore(this.app);

  public datepipe: any = inject(DatePipe);

  public mensajeForo: mensajeForo = {
    Categoria: '',
    Usuario: '',
    Mensaje: '',
    Fecha: new Date()
  } as unknown as mensajeForo;

  private docRefModifica: DocumentReference | null = null;
  public modificando: WritableSignal<boolean> = signal(false);
  public sacar: WritableSignal<boolean> = signal(true);

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
        })
        );
        this.dibujar(this.mensajesForo());
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

  public generateTxtFile(fileName: string, textContent: string): void {
    // 1. Creamos un Blob con el texto y definimos su tipo como texto plano
    const blob: Blob = new Blob([textContent], { type: "text/csv;charset=utf-8" });

    // 2. Creamos un elemento <a> temporal en la memoria del navegador
    const link: HTMLAnchorElement = document.createElement("a");

    // 3. Creamos una URL única que apunta a los datos de nuestro Blob
    link.href = URL.createObjectURL(blob);

    // 4. Asignamos el nombre por defecto que tendrá el archivo descargado
    link.download = fileName;

    // 5. Ocultamos el enlace, lo metemos en la página y simulamos el clic de descarga
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();

    // 6. Limpiamos la memoria borrando el enlace y liberando la URL creada
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);


  }

  dibujar(mensajes: mensajeForo[]) {

    let datos = {
      labels: mensajes.filter((m, index, self) => self.findIndex(t => t.Usuario === m.Usuario) === index).map(m => m.Usuario),
      datasets: [{
        label: 'Mensajes por usuario',
        data: mensajes.filter((m, index, self) => self.findIndex(t => t.Usuario === m.Usuario) === index).map(m => mensajes.filter(t => t.Usuario === m.Usuario).length),
      }]
    };

    const pieConfig = {
      type: 'pie' as const,
      data: datos
    };

    new chartjs(document.getElementById('myChart') as HTMLCanvasElement, pieConfig);
    
  
    const barConfig = {
      type: 'line' as const,
      data: datos
    };

    new chartjs(document.getElementById('myChart2') as HTMLCanvasElement, barConfig);
    
  
  }


}

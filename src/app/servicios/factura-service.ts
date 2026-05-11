import { Injectable } from '@angular/core';
import { Factura } from '../clases/factura';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../clases/user';
import  facturajson  from '../JSON/facturas.json';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {

  obtenerProximoNumero(): Observable<number> {
    let respuesta = new Observable<number>(obs => {

      this.retornarFacturas();
      setTimeout(() => {

        obs.next(this.facturas.length + 1);
        obs.complete();

      }, 1000); // Simula una demora en la obtención del número
    });

    return respuesta;

  }

  /**
   *
   */
  constructor(public httClient: HttpClient) {

  }

  private facturas: Array<Factura> = [];

  public obtenerFactura(numero: number): Observable<Factura | undefined> {
    let respuesta = new Observable<Factura | undefined>(obs => {
      const factura = this.facturas.find(f => f.numero === numero);
      obs.next(factura);
      obs.complete();
    });
    return respuesta;
  }

  public agregarFactura(factura: Factura) {
    this.facturas.push(factura);
    this.persistirFacturas();
  }

  public modificarFactura(factura: Factura) {
    const index = this.facturas.findIndex(f => f.numero === factura.numero);
    if (index !== -1) {
      this.facturas[index] = factura;
    }
    this.persistirFacturas();
  }

  public retornarFacturas(): Observable<Array<Factura>> {
    let respuesta = new Observable<Array<Factura>>(obs => {
      const facturasGuardadas = localStorage.getItem('facturas');
      if (facturasGuardadas) {
        // this.facturas = <Array<Factura>> facturajson.map((f: any) => {
        //   return new Factura(new Date(f.fecha), f.numero, f.tipo, f.receptor);
        // }
         this.facturas = JSON.parse(facturasGuardadas);
      }
      else
        this.facturas = [];
      setTimeout(() => {
        obs.next(this.facturas);
      }, 1000); // Simula una demora en la obtención de las facturas

      // setTimeout(() => {
      //   this.facturas.push(...this.facturas);
      //   obs.next(this.facturas);
      // }, 2000);
      setTimeout(() => {
        obs.complete();
      }, 1500);
    });

    return respuesta;
  }

  public buscarUsuarios(): Observable<Array<User>> {
    return this.httClient.get<Array<User>>('https://jsonplaceholder.typicode.com/posts');
  }


  private persistirFacturas() {
    localStorage.setItem('facturas', JSON.stringify(this.facturas));
  }

}

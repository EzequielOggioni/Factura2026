import { Component, StreamingResourceOptions } from '@angular/core';
import { Factura, tipoFactura } from '../../clases/factura';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetalleFactura } from '../../clases/detalle-factura';

@Component({
  selector: 'app-lista',
  imports: [CommonModule, FormsModule],
  templateUrl: './lista.html',
  styleUrl: './lista.scss',
})
export class Lista {
  public miFactura: Factura;
  public tipo: String = "text";
  public EtipoFactura = tipoFactura;
public claseCuerpo:string = 'cuerpo';

  constructor() {

    this.miFactura = new Factura(new Date(), 1, tipoFactura.C, "Consumidor final");
  }

  mostrarLetra(valor: tipoFactura): string {
    return valor == tipoFactura.A ? "A" : valor == tipoFactura.B ? "B" : "C";
  }

  agregarDetalle() {
    this.miFactura.items.push( <DetalleFactura>{cantidad:this.miFactura.items.length +1,descripcion:'producto 1',precioUnitario:25000 });
    this.miFactura.calcularTotal();

  }

  guardar() {
    console.info(this.miFactura);
  }
  cambiarFondo() {
    this.claseCuerpo = this.miFactura.tipo == this.EtipoFactura.A ? 'cuerpo-contraste':  this.miFactura.tipo == this.EtipoFactura.B ? 'cuerpo-pastel' :'cuerpo';  
  }

}

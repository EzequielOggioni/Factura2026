import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Factura, tipoFactura } from '../../clases/factura';
import { DetalleFactura } from '../../clases/detalle-factura';
import { RouterLink } from "@angular/router";
import { FacturaService } from '../../servicios/factura-service';

@Component({
  selector: 'app-factura',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './factura.html',
  styleUrl: './factura.scss',
})
export class FacturaComponent {

  public miFactura: Factura ;
  public tipo: String = "text";
  public EtipoFactura = tipoFactura;
  public claseCuerpo: string = 'cuerpo';
  public vacios: Array<number> = new Array(20).fill(0).map((_, i) => i + 1);


  constructor(public servicio: FacturaService) { 
    this.miFactura ={} as Factura;
    
  }
  
  ngOnInit() {
    this.servicio.obtenerProximoNumero().subscribe(numero => {
      this.miFactura = new Factura(new Date(),numero, tipoFactura.C, "Consumidor final");
    });
  
  }

  mostrarLetra(valor: tipoFactura): string {
    return valor == tipoFactura.A ? "A" : valor == tipoFactura.B ? "B" : "C";
  }

  agregarDetalle() {
    this.miFactura.items.push(<DetalleFactura>{ cantidad: (this.miFactura.items.length % 4) + 1, descripcion: 'producto ' + (this.miFactura.items.length + 1).toString(), precioUnitario: 25000 });
    this.miFactura.calcularTotal();
    this.vacios = Array.from({ length: 20 - this.miFactura.items.length }, (_, i) => i + 1);
  }

  guardar() {
    console.info(this.miFactura);
    this.servicio.agregarFactura(this.miFactura);  
}
  cambiarFondo() {
    this.claseCuerpo = this.miFactura.tipo == this.EtipoFactura.A ? 'cuerpo-contraste' : this.miFactura.tipo == this.EtipoFactura.B ? 'cuerpo-pastel' : 'cuerpo';
  }

}
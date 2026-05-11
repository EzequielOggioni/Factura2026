import { Component, StreamingResourceOptions } from '@angular/core';
import { Factura, tipoFactura } from '../../clases/factura';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { FacturaService } from '../../servicios/factura-service';
import { Observable } from 'rxjs';
import { User } from '../../clases/user';
import { ItemLista } from "../item-lista/item-lista";

@Component({
  selector: 'app-lista',
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule, ItemLista],
  templateUrl: './lista.html',
  styleUrl: './lista.scss',
})
export class Lista {
   public facturas: Observable<Array<Factura>> = new Observable<Array<Factura>>();
   //public facturas:Array<Factura> ;
   public usuarios: Observable<Array<User>> = new Observable<Array<User>>();
   
   constructor(public servicio: FacturaService) {
    //this.facturas = [];
    this.facturas = this.servicio.retornarFacturas();
    this.usuarios = this.servicio.buscarUsuarios();
  }
  
  ngOnInit() {
    // this.servicio.retornarFacturas().subscribe(facturas => {
    //  this.facturas.push(...facturas);       
    // });
  }

  ver(){
    console.info(this.facturas);
  }
}

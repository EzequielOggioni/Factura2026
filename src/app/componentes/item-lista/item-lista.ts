import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Factura } from '../../clases/factura';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-lista',
  imports: [RouterLink,CommonModule],
  templateUrl: './item-lista.html',
  styleUrl: './item-lista.scss',
})
export class ItemLista {
  @Input('variabledeentradadelelementohijo')
  public factura: Factura;

  constructor(){
    this.factura =  new Factura(new Date(),1,1,'');
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Factura } from '../clases/factura';

@Pipe({
  name: 'filtraFactura',
})
export class FiltraFacturaPipe implements PipeTransform {

  transform(value: Array<Factura>|null, filtro: string): Array<Factura> {
   
      if (!value) return [];
      if (!filtro) return value;

    return value.filter((factura) => {
      return factura.numero.toString().includes(filtro) ||
             factura.tipo.toString().includes(filtro.toLowerCase()) ||
             factura.total.toString().includes(filtro);
    });
  }

}   

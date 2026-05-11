import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoFactura',
})
export class TipoFacturaPipe implements PipeTransform {

  transform(value: number | string): string {
    switch (typeof value === 'string' ? parseInt(value) : value) {
      case 0:
        return 'Factura A';
      case 1:
        return 'Factura B';
      case 2:
        return 'Factura C';
      default:
        return 'Tipo de factura no reconocido' + value.toString() + typeof(value).toString();
    }
  }

}

import { DetalleFactura } from "./detalle-factura";

export class Factura {

    public fecha: Date;
    public tipo: tipoFactura;
    public numero: number;
    public iva: number = 0;
    public total: number = 0;
    public neto: number = 0;
    public receptor: string;
    public items: Array<DetalleFactura>;


    constructor(fecha: Date, numero: number, tipo: tipoFactura, receptor: string) {
        this.fecha = fecha;
        this.numero = numero;
        this.tipo = tipo;
        this.receptor = receptor;
        this.items = new Array<DetalleFactura>();
    }


    calcularTotal() {

        this.neto = this.items.reduce((acum, item) => { return acum + (item.cantidad * item.precioUnitario); }, 0);
        this.iva = this.neto * 0.21;
        this.total = this.iva + this.neto;
    }
}
export enum tipoFactura {
    A,
    B,
    C
}

import { Ubicacion } from './Ubicacion';

export class Direccion {
    valor: String;
    codigoPostal: String;
    ubicacion: Ubicacion;
    ranking: Number;
    geoReferencia: [Number];
    ultimaActualizacion: Date;
    activo: Boolean;

    constructor(direccion?)
    {
        direccion = direccion || {};
        this.valor = direccion.valor || '';
        this.codigoPostal = direccion.codigoPostal || '';
        this.ubicacion = new Ubicacion(direccion.ubicacion);
        this.activo = direccion.activo;
    }
}
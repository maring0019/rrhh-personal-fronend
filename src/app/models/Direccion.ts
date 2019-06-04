import { Ubicacion } from './Ubicacion';
import { Localidad } from './Localidad';


export class Direccion {
    valor: String;
    codigoPostal: String;
    barrio: String;
    localidad: Localidad;
    ubicacion: Ubicacion;
    ranking: Number;
    geoReferencia: [Number];
    ultimaActualizacion: Date;
    activo: Boolean;
    // Info extra complementaria
    calleIzquierda: String;
    calleDerecha: String;
    calleParalela: String;
    complementarios: String;

    constructor(direccion?)
    {
        direccion = direccion || {};
        this.valor = direccion.valor || '';
        this.codigoPostal = direccion.codigoPostal || '';
        this.barrio = direccion.barrio || '';
        this.localidad = direccion.localidad;
        this.activo = direccion.activo;
        this.calleIzquierda = direccion.calleIzquierda || '';
        this.calleDerecha = direccion.calleDerecha || '';
        this.calleParalela = direccion.calleParalela || '';
        this.complementarios = direccion.complementarios || '';
    }
}
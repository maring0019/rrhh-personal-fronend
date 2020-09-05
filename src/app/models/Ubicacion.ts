export class Ubicacion {
    _id: String;
    codigo: Number;
    nombre: String;
    nombreCorto: String;
    interno: Boolean;
    tipo: Number; // Es una referencia al codigo del tipo de ubicacion
    subtipo: Number; // Es una referencia al codigo del subtipo de ubicacion
    telefono: String;
    despachoHabilitado: Boolean;

    constructor(ubicacion?) {
        ubicacion = ubicacion || {};
        this._id = ubicacion._id || null;
        this.codigo = ubicacion.codigo || null;
        this.nombre = ubicacion.nombre || "";
        this.nombreCorto = ubicacion.nombreCorto || "";
        this.interno = ubicacion.interno;
        this.tipo = ubicacion.tipo;
        this.subtipo = ubicacion.subtipo;
        this.telefono = ubicacion.telefono || "";
        this.despachoHabilitado = ubicacion.despachoHabilitado;
    }
}

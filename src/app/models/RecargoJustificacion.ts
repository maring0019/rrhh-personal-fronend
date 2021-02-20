export class RecargoJustificacion {
    _id: String;
    nombre: String;
    observaciones: String;

    constructor(justificacion?)
    {
        justificacion = justificacion || {};
        this._id = justificacion._id;
        this.nombre = justificacion.nombre || '';
        this.observaciones = justificacion.observaciones || '';
    }
}
export class ParteJustificacion {
    _id: string;
    nombre: string;

    constructor(justificacion?)
    {
        justificacion = justificacion || {};
        this._id = justificacion._id || null;
        this.nombre = justificacion.nombre || '';
    }
}
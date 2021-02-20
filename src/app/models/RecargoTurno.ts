export class RecargoTurno {
    _id: String;
    nombre: String;
    observaciones: String;

    constructor(turno?)
    {
        turno = turno || {};
        this._id = turno._id;
        this.nombre = turno.nombre || '';
        this.observaciones = turno.observaciones || '';
    }
}
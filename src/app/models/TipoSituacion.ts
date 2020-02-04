export class TipoSituacion {
    _id: string;
    nombre: string;
    requiereVencimiento: Boolean;

    constructor(situacion?)
    {
        situacion = situacion || {};
        this._id = situacion._id || null;
        this.nombre = situacion.nombre || '';
        this.requiereVencimiento = this.requiereVencimiento;
    }
}
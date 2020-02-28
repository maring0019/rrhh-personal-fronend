export class TipoSituacion {
    _id: string;
    nombre: string;
    requiereVencimiento: Boolean;
    activo: Boolean;

    constructor(situacion?)
    {
        situacion = situacion || {};
        this._id = situacion._id || null;
        this.nombre = situacion.nombre || '';
        this.requiereVencimiento = this.requiereVencimiento;
        this.activo = this.activo;
    }
}
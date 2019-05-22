export class TipoSituacion {
    id: string;
    nombre: string;
    requiereVencimiento: Boolean;

    constructor(situacion?)
    {
        situacion = situacion || {};
        this.id = situacion.id || null;
        this.nombre = situacion.nombre || '';
        this.requiereVencimiento = this.requiereVencimiento;
    }
}
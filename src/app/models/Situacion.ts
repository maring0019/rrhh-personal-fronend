export class Situacion {
    id: string;
    nombre: string;
    requiereVencimiento: Boolean;

    constructor(situacion?)
    {
        situacion = situacion || {};
        this.nombre = situacion.nombre || '';
        this.requiereVencimiento = this.requiereVencimiento;
    }
}
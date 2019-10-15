export class ParteJustificacion {
    id: string;
    nombre: string;

    constructor(justificacion?)
    {
        justificacion = justificacion || {};
        this.id = justificacion.id || null;
        this.nombre = justificacion.nombre || '';
    }
}
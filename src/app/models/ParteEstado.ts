export class ParteEstado {
    id: string;
    nombre: string;

    constructor(estado?)
    {
        estado = estado || {};
        this.id = estado.id || null;
        this.nombre = estado.nombre || '';
    }
}
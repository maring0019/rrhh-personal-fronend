export class ParteEstado {
    _id: string;
    nombre: string;

    constructor(estado?)
    {
        estado = estado || {};
        this._id = estado._id || null;
        this.nombre = estado.nombre || '';
    }
}
export class ParteEstado {
    _id: string;
    nombre: string;
    codigo: number;

    constructor(estado?)
    {
        estado = estado || {};
        this._id = estado._id || null;
        this.nombre = estado.nombre || '';
        this.codigo = estado.codigo;
    }
}
export class Agrupamiento {
    _id: String;
    nombre: string;

    constructor(agrupamiento?)
    {
        agrupamiento = agrupamiento || {};
        this._id = agrupamiento._id || null;
        this.nombre = agrupamiento.nombre || '';
    }
}
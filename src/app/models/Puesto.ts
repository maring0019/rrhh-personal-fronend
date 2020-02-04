export class Puesto {
    _id: String;
    nombre: string;

    constructor(puesto?)
    {
        puesto = puesto || {};
        this._id = puesto._id || null;
        this.nombre = puesto.nombre || '';
    }
}
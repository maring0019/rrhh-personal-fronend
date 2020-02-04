export class RegimenHorario {
    _id: String;
    nombre: string;

    constructor(regimem?)
    {
        regimem = regimem || {};
        this._id = regimem._id || null;
        this.nombre = regimem.nombre || '';
    }
}
export class CausaBaja {
    _id: string;
    nombre: string;

    constructor(causa?)
    {
        causa = causa || {};
        this._id = causa._id || null;
        this.nombre = causa.nombre || '';
    }
}
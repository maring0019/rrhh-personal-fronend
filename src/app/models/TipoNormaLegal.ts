export class TipoNormaLegal {
    _id: String;
    nombre: String;

    constructor(tipoNormaLegal?)
    {
        tipoNormaLegal = tipoNormaLegal || {};
        this._id = tipoNormaLegal._id || null;
        this.nombre = tipoNormaLegal.nombre || '';
    }
}
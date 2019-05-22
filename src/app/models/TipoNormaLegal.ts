export class TipoNormaLegal {
    id: String;
    nombre: String;

    constructor(tipoNormaLegal?)
    {
        tipoNormaLegal = tipoNormaLegal || {};
        this.id = tipoNormaLegal.id || null;
        this.nombre = tipoNormaLegal.nombre || '';
    }
}
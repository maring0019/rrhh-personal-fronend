export class TipoNormaLegal {
    nombre: String;

    constructor(tipoNormaLegal?)
    {
        tipoNormaLegal = tipoNormaLegal || {};
        this.nombre = tipoNormaLegal.nombre || '';
    }
}
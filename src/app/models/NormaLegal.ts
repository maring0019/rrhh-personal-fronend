import { TipoNormaLegal } from './TipoNormaLegal';

export class NormaLegal {
    id: String;
    tipoNormaLegal: TipoNormaLegal;
    numeroNormaLegal: String;
    fechaNormaLegal: Date;
    observaciones: String;

    constructor(normaLegal?)
    {
        normaLegal = normaLegal || {};
        this.id = normaLegal.id || null;
        this.tipoNormaLegal = normaLegal.tipoNormaLegal || null;
        this.numeroNormaLegal = normaLegal.numeroNormaLegal || '';
        this.fechaNormaLegal = normaLegal.fechaNormaLegal;
        this.observaciones = normaLegal.observaciones || '';
    }
}
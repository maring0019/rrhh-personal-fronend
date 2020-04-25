import { TipoNormaLegal } from './TipoNormaLegal';
import { localDate } from 'src/app/utils/dates';

export class NormaLegal {
    _id: String;
    tipoNormaLegal: TipoNormaLegal;
    numeroNormaLegal: String;
    fechaNormaLegal: Date;
    observaciones: String;

    constructor(normaLegal?)
    {
        normaLegal = normaLegal || {};
        this._id = normaLegal._id || undefined;
        this.tipoNormaLegal = normaLegal.tipoNormaLegal || null;
        this.numeroNormaLegal = normaLegal.numeroNormaLegal || '';
        this.fechaNormaLegal = localDate(normaLegal.fechaNormaLegal) ;
        this.observaciones = normaLegal.observaciones || '';
    }
}
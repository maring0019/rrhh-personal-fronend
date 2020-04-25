import { TipoNormaLegal } from './TipoNormaLegal';
import { CausaBaja } from 'src/app/models/CausaBaja';
import { localDate } from 'src/app/utils/dates';

export class BajaAgente {
    _id: String;
    fecha: Date;
    causa: CausaBaja;
    tipoNormaLegal: TipoNormaLegal;
    numeroNormaLegal: String;
    observaciones: String;

    constructor(baja?)
    {
        baja = baja || {};
        this._id = baja._id || null;
        this.fecha = localDate(baja.fecha);
        this.causa = baja.causa || null;
        this.tipoNormaLegal = baja.tipoNormaLegal || null;
        this.numeroNormaLegal = baja.numeroNormaLegal || '';
        this.observaciones = baja.observaciones || '';
    }
}
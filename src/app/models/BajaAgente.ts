import { TipoNormaLegal } from './TipoNormaLegal';
import { CausaBaja } from 'src/app/models/CausaBaja';

export class BajaAgente {
    id: String;
    fecha: Date;
    causa: CausaBaja;
    tipoNormaLegal: TipoNormaLegal;
    numeroNormaLegal: String;
    observaciones: String;

    constructor(baja?)
    {
        baja = baja || {};
        this.id = baja.id || null;
        this.fecha = baja.fecha;
        this.causa = baja.causa || null;
        this.tipoNormaLegal = baja.tipoNormaLegal || null;
        this.numeroNormaLegal = baja.numeroNormaLegal || '';
        this.observaciones = baja.observaciones || '';
    }
}